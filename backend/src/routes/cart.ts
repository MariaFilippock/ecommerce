import {Router} from 'express';
import itemData from '../data/data.json';
import {ItemAtCartType, ItemType} from '../models';

const items: ItemType[] = itemData.items;
let cart: ItemAtCartType[] = itemData.cart;

const cartRouter = Router();


cartRouter.get('/cart', (_req, res) => {
    try {
        const detailedCart = cart.map((cartItem) => {
            const product = items.find(item => item.id === cartItem.id);

            return {
                ...product,
                count: cartItem.count
            }
        });

        res.json(detailedCart);
    } catch (e) {
        console.error(e);
    }
});

cartRouter.post('/cart', (req, res) => {
    try {
        const {id, count = 1} = req.body;

        if (!id) {
            return res.status(400).json({message: 'cartItemId is required!'});
        }

        const existingItem = cart.find((cartItem) => cartItem.id === id);

        if (existingItem) {
            existingItem.count += count;

            if (existingItem.count <= 0) {
                cart = cart.filter(item => item.id !== id)
            }
        } else if (count > 0) {
            cart.push({id, count});
        }

        res.status(200).json(cart);
    } catch (e) {
        res.status(500).json(e)
    }
});

export default cartRouter;