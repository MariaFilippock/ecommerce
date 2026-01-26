import {Router} from 'express';
import _productsData from '../data/data.json';
import {IProductsState} from '../models';
import {deleteFromYandex} from '../yandexStorage';

const productsData = _productsData as IProductsState;

const productsRouter = Router();

//получение списка товаров
productsRouter.get('/products/', (_req, res) => {
    try {
        res.json(productsData.products);
    } catch (e) {
        res.status(500).json(e);
    }
})

//получение одного товара по id
productsRouter.get('/products/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const foundProduct = productsData.products.find(product => product.id === id);

        return res.json(foundProduct);
    } catch (e) {
        res.status(500).json(e);
    }
})

//добавление нового товара в общий список
productsRouter.post('/products/create', (req, res) => {
    try {
        const newProduct = req.body;
        const nextId = productsData.products.length > 0 ? Math.max(...productsData.products.map(el => el.id)) + 1 : 1;
        const productToSave = {...newProduct, id: nextId};

        productsData.products.push(productToSave);

        res.status(201).json(productsData.products);
    } catch (e) {
        res.status(500).json(e);
    }
})

//удаление товара из общего списка
productsRouter.delete('/products/delete/:id', (req, res) => {
    try {
        const removedProductId = Number(req.params.id);
        productsData.products = productsData.products.filter(product => product.id !== removedProductId);


        res.status(200).send();
    } catch (e) {
        res.status(500).json(e);
    }
})

//редактирование данных по товару из общего списка
productsRouter.put('/products/update/:id', async (req, res) => {
    try {
        const editedProduct = req.body;

        const index = productsData.products.findIndex(product => product.id === editedProduct.id);

        if (index === -1) {
            return res.status(404).json('Товар не найден!')
        }
        //добавить сверку по урлам? и если отсутствует url то удаляем через команду
        const urls = productsData.products[index].img.filter(url => !editedProduct.img.includes(url));
        if (urls.length > 0) {
            await deleteFromYandex(urls);
        }

        productsData.products[index] = {
            ...productsData.products[index],
            ...editedProduct
        }

        res.status(200).json(productsData.products);
    } catch (e) {
        res.status(500).json(e);
    }
})

export default productsRouter;
