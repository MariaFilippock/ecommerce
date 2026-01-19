import express from 'express';
import path from 'path';
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

import cartRouter from './routes/cart';
import favoritesRouter from './routes/favorites';
import productsRouter from './routes/products';
import uploadRouter from './routes/upload';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
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

console.log("YANDEX ENV:", {
  access: process.env.YANDEX_ACCESS_KEY,
  secret: process.env.YANDEX_SECRET_KEY ? "***MASKED***" : undefined,
  bucket: process.env.YANDEX_BUCKET
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
