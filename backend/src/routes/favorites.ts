import {Router} from 'express';
import _productsData from '../data/data.json';
import {IProductsState} from '../models';
import {getDetailedFavoritesList} from '../helper';

const productsData = _productsData as IProductsState;

const favoritesRouter = Router();

favoritesRouter.get('/favorites/', (_req, res) => {
    try {
        const favoritesList = getDetailedFavoritesList(productsData);

        res.json(favoritesList);
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

        const favoritesList = getDetailedFavoritesList(productsData);

        res.status(200).json(favoritesList);
    } catch (e) {
        res.status(500).json(e);
    }
})

export default favoritesRouter;