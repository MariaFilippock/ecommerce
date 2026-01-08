import {AppThunk} from '../store/types';
import {setItemsAC} from '../store/items-reducer';

export const setItemsThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/items');
        const items = await res.json();

        dispatch(setItemsAC(items));
    } catch (e) {
        console.error('setItemsThunk error', e);
    }
}
