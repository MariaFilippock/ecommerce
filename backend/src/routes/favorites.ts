import {Router} from 'express';
import itemsData from '../data/data.json';

let favorites: number[] = itemsData.favorites;

const favoritesRouter = Router();

favoritesRouter.get('/favorites/', (_req, res) => {
    try {
        res.json(favorites);
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

        const exists = favorites.includes(id);

        if (exists) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }

        res.status(200).json(favorites);
    } catch (e) {
        res.status(500).json(e);
    }
})

export default favoritesRouter;