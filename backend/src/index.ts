import express from 'express';
import path from 'path';
import cartRouter from './routes/cart';
import favoritesRouter from './routes/favorites';
import productsRouter from './routes/products';
import cors from "cors";

const app = express(); // создаём сервер
const PORT = process.env.PORT || 5001;


app.use(cors({
    origin: "https://ecommerce-front-3tbu.onrender.com"
}));

app.use(express.json()); //подключает middleware для разбора JSON в теле запроса, учим сервер понимать JSON

app.use('/img', express.static(path.join(__dirname, '../public/img')));

app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', favoritesRouter);

app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok', uptime: process.uptime()});
});

// Статика фронтенда
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

// SPA fallback — любые другие маршруты → index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
