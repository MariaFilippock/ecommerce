import {Router} from 'express';
import itemsData from '../data/data.json';
import {ItemType} from '../models';

const items: ItemType[] = itemsData.items;

const itemsRouter = Router();

//получение списка товаров
itemsRouter.get('/items/', (_req, res) => {
    try {
        res.json(items);
    } catch (e) {
        res.status(500).json(e);
    }
})

//получение одного товара по id
itemsRouter.get('/items/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const foundItem = items.find(item => item.id === id);

        return res.json(foundItem);
    } catch (e) {
        res.status(500).json(e);
    }
})

//добавление нового товара в общий список
itemsRouter.post('/items/create', (req, res) => {
    try {
        const newItem = req.body;
        const nextId = items.length > 0 ? Math.max(...items.map(el => el.id)) + 1 : 1;
        const itemToSave = {...newItem, id: nextId};

        items.push(itemToSave);

        res.status(201).json(items);
    } catch (e) {
        res.status(500).json(e);
    }
})

//удаление товара из общего списка
itemsRouter.delete('/items/:id', (req, res) => {
    try {
        const removedItemId = Number(req.params.id);
        const filteredItems = items.filter(item => item.id !== removedItemId);

        res.status(200).json(filteredItems);
    } catch (e) {
        res.status(500).json(e);
    }
})

//редактирование данных по товару из общего списка
itemsRouter.put('/items/update', (req, res) => {
    try {
        const editedItem = req.body;

        const index = items.findIndex(item => item.id === editedItem.id);

        if (index === -1) {
            return res.status(404).json('Товар не найден!')
        }

        items[index] = {
            ...items[index],
            ...editedItem
        }

        res.status(200).json(items);
    } catch (e) {
        res.status(500).json(e);
    }
})

export default itemsRouter;
