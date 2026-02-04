import {ICartProduct} from './models';

export class UtilsComponent {
    cartProductsQuantity(cart: ICartProduct[]) {
        return cart.reduce((quantity, product) => {
            return quantity + product.count
        }, 0);
    }

    cartProductsTotalCost(cart: ICartProduct[]) {
        return cart.reduce((sum, product) => {
            return sum + (product.count * Number(product.price))
        }, 0).toFixed(2);
    }

    totalCostPerProduct(cartProduct: ICartProduct) {
        return (Number(cartProduct.price) * cartProduct.count).toFixed(2);
    }
}

const Utils = new UtilsComponent();

export default Utils;
