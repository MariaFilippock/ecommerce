import {detailedCartItemType, ItemAtCartType} from './models';

export class UtilsComponent {
    cartItemsQuantity(cart: ItemAtCartType[]) {
        return cart.reduce((quantity, item) => {
            return quantity + item.count
        }, 0);
    }

    cartItemsTotalCost(cart: detailedCartItemType[]) {
        return cart.reduce((sum, item) => {
            return sum + (item.count * Number(item.price))
        }, 0).toFixed(2);
    }

    totalCostPerItem(cart: detailedCartItemType) {
        return Number(cart.price) * cart.count;
    }
}

const Utils = new UtilsComponent();

export default Utils;
