import {setCartAC} from '../store/products-reducer';
import {AppThunk} from '../store/types';

export const changeProductCountThunk = (productId: number, delta: number): AppThunk => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: productId, count: delta})
    });

    if (!res.ok) {
        throw new Error('Failed to add product to cart');
    }

    const cart = await res.json();

    dispatch(setCartAC(cart));
}

export const setCartThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/cart');
        const data = await res.json();
        dispatch(setCartAC(data));
    } catch (e) {
        console.error('setCartThunk error', e);
    }
}
