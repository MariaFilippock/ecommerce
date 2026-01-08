import {Router} from 'express';
import itemsData from '../data/data.json';
import {ItemType} from '../models';

const items: ItemType[] = itemsData.items;

const itemsRouter = Router();

itemsRouter.get('/items/', (_req, res) => {
    try {
        res.json(items);
    } catch (e) {
        res.status(500).json(e)
    }
})

itemsRouter.get('/items/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const foundItem = items.find(item => item.id === id);

        return res.json(foundItem);
    } catch (e) {
        res.status(500).json(e)
    }
})

export default itemsRouter;
