import {Router} from 'express';
import _productsData from '../data/data.json';
import {IProductsStateType} from '../models';

const productsData = _productsData as IProductsStateType;

const favoritesRouter = Router();

favoritesRouter.get('/favorites/', (_req, res) => {
    try {
        res.json(productsData.favorites);
    } catch (e) {
        res.status(500).json(e);
    }
})

favoritesRouter.post('/favorites/', (req, res) => {
    try {
        const {id} = req.body;

        if (id === undefined || id === null) {
            return res.status(400).json({message: 'Id is required!'});
        }

        const exists = productsData.favorites.includes(id);

        if (exists) {
            productsData.favorites = productsData.favorites.filter(favId => favId !== id);
        } else {
            productsData.favorites.push(id);
        }

        res.status(200).json(productsData.favorites);
    } catch (e) {
        res.status(500).json(e);
    }
})

export default favoritesRouter;