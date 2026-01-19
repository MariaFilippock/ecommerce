import {IProductsState} from './models';

export const getDetailedCartProducts = (productsData: IProductsState) => {
    return productsData.cart.map((cartProduct) => {
        const product = productsData.products.find(product => product.id === cartProduct.id);

        return {
            ...product,
            count: cartProduct.count
        }
    })
}

export const getDetailedFavoritesList = (productsData: IProductsState) => {
    return productsData.favorites.map((favProductId) => {
        return productsData.products.find(product => product.id === favProductId);
    })
}

