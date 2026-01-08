import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items';
import path from 'path';
import cartRouter from './routes/cart';

const app = express(); // создаём сервер
const PORT = 5001;

// app.use(cors({
//     origin: 'http://localhost:3000', // разрешаем запросы с фронта
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// })); // подключает middleware CORS, разрешаем запросы с других доменов

app.use('/img', express.static(path.join(__dirname, '../public/img')));

app.use(express.json()); //подключает middleware для разбора JSON в теле запроса, учим сервер понимать JSON

app.use('/api', itemsRouter);
app.use('/api', cartRouter);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
