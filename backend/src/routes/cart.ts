import {Router} from 'express';
import _productsData from '../data/data.json';
import {IProductsStateType} from '../models';

const productsData = _productsData as IProductsStateType;

const cartRouter = Router();

cartRouter.get('/cart', (_req, res) => {
    try {
        const detailedCart = productsData.cart.map((cartProduct) => {
            const product = productsData.products.find(product => product.id === cartProduct.id);

            return {
                ...product,
                count: cartProduct.count
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
            return res.status(400).json({message: 'Id is required!'});
        }

        const existingProduct = productsData.cart.find((cartProduct) => cartProduct.id === id);

        if (existingProduct) {
            existingProduct.count += count;

            if (existingProduct.count <= 0) {
                productsData.cart = productsData.cart.filter(product => product.id !== id);
            }
        } else if (count > 0) {
            productsData.cart.push({id, count});
        }

        res.status(200).json(productsData.cart);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default cartRouter;