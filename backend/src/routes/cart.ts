import {Router} from 'express';
import _productsData from '../data/data.json';
import {IProductsState} from '../models';
import {getDetailedCartProducts} from '../helper';

const productsData = _productsData as IProductsState;

const cartRouter = Router();

cartRouter.get('/cart', (_req, res) => {
    try {
        const detailedCart = getDetailedCartProducts(productsData);

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

        const detailedCartProducts = getDetailedCartProducts(productsData);

        res.status(200).json(detailedCartProducts);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default cartRouter;