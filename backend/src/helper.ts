import {IProduct, IProductAtCart, IProductsState} from './models';

export const getDetailedCartProducts = (productsData: IProductsState) => {
    let productsMap = new Map();
    let cartProducts: (IProduct | IProductAtCart)[] = [];

    productsData.products.forEach((product) => {
        // if (!product.isDeleted) {
            productsMap.set(product.id, product);
        // }
    })

    productsData.cart.forEach((cartProduct) => {
        if (productsMap.has(cartProduct.id)) {
            cartProducts.push({...productsMap.get(cartProduct.id), count: cartProduct.count})
        }
    })

    return cartProducts;
}

export const getDetailedFavoritesList = (productsData: IProductsState) => {
    const productsMap = new Map();
    const favoriteProducts: IProduct[] = [];

    productsData.products.forEach((product) => {
        // if (!product.isDeleted) {
            productsMap.set(product.id, product);
        // }
    })

    productsData.favorites.forEach((favId) => {
        if (productsMap.has(favId)) {
            favoriteProducts.push(productsMap.get(favId))
        }
    })

    return favoriteProducts;
}
