import {detailedCartProductType, ICartProductType} from './models';

export class UtilsComponent {
    cartProductsQuantity(cart: ICartProductType[]) {
        return cart.reduce((quantity, product) => {
            return quantity + product.count
        }, 0);
    }

    cartProductsTotalCost(cart: detailedCartProductType[]) {
        return cart.reduce((sum, product) => {
            return sum + (product.count * Number(product.price))
        }, 0).toFixed(2);
    }

    totalCostPerProduct(cart: detailedCartProductType) {
        return Number(cart.price) * cart.count;
    }
}

const Utils = new UtilsComponent();

export default Utils;
