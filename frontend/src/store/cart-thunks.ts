import {setCartAC} from '../store/items-reducer';
import {AppThunk} from '../store/types';

export const changeItemCountThunk = (itemId: number, delta: number): AppThunk => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: itemId, count: delta})
    });

    if (!res.ok) {
        throw new Error('Failed to add item to cart');
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
