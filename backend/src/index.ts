import express from 'express';
import axios from 'axios';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import {createProxyMiddleware} from 'http-proxy-middleware';
// import dotenv from "dotenv"; //для локального запуска

// dotenv.config({path: path.resolve(__dirname, '../../.env')}); //для локального запуска//для локального запуска

import cartRouter from './routes/cart';
import favoritesRouter from './routes/favorites';
import productsRouter from './routes/products';
import uploadRouter from './routes/upload';

const app = express();
const PORT = process.env.PORT || 5001;

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const telegramStream = {
    write: async (message: string) => {

        // Чистим строку от лишних символов переноса строки
        const cleanMessage = message.trim();

        const ip = cleanMessage.match(/^(\S+)/)?.[1] || '-';
        const request = cleanMessage.match(/"(\w+) (\S+) HTTP\/[\d.]+"/)?.[0] || '-';
        const statusCode = parseInt(cleanMessage.match(/" (\d{3}) /)?.[1] || '0');
        const time = cleanMessage.match(/- (\d+\.?\d*) ms/)?.[1] || '-';

        const formatted = `*HTTP Log*
            • IP: ${ip}
            • Request: ${request}
            • Status:  ${statusCode}
            • Time: ${time} ms`;
        try {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
                {
                    chat_id: TELEGRAM_CHAT_ID,
                    text: formatted,
                    parse_mode: 'Markdown'
                })
        } catch (e) {
            console.error('Failed to send log to Telegram:', e);
        }
    }
}

app.set('trust proxy', true); //express должен читать X-Forwarded-For заголовок от прокси
const morganFormat = ':remote-addr - [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, {stream: telegramStream})); //логирование http-запросов

app.use(cors({origin: "*"}));
app.use(express.json());

// API маршруты
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', favoritesRouter);
app.use('/api', uploadRouter);

app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok', uptime: process.uptime()});
});

// DEVELOPMENT MODE
// Проксируем React Dev Server
if (process.env.NODE_ENV !== 'production') {
    console.log("Dev mode: proxying React dev-server");

    app.use(
        '/',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true
        })
    );
} else {
    // PRODUCTION MODE
    console.log("Production mode: serving React build");
    const frontendBuildPath = path.join(__dirname, '../../frontend/build');

    // Раздача статики
    app.use(express.static(frontendBuildPath));

    // SPA fallback
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
