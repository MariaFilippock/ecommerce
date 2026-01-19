import {setCartAC, setIsLoadingAC} from '../store/products-reducer';
import {AppThunk} from '../store/types';
import {ICartProduct} from '../models';

export const changeProductCountThunk = (cartProduct: ICartProduct): AppThunk => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cartProduct)
    });

    if (!res.ok) {
        throw new Error('Failed to add product to cart');
    }

    const cart = await res.json();

    dispatch(setCartAC(cart));
}

export const loadCartThunk = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));

        const res = await fetch('/api/cart');

        const data = await res.json();
        console.log(data);
        dispatch(setCartAC(data));
    } catch (e) {
        console.error('loadCartThunk error', e);
    } finally {
        dispatch(setIsLoadingAC(false));
    }
}
