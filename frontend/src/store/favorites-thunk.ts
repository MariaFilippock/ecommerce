import {AppThunk} from '../store/types';
import {setFavoritesAC} from '../store/products-reducer';
import {API_HOST} from '../const';


export const setFavoritesThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch(`${API_HOST}/api/favorites`);
        const data = await res.json();

        dispatch(setFavoritesAC(data));
    } catch (e) {
        console.error('setFavoritesThunk');
    }
}

export const toggleFavoritesThunk = (id: number): AppThunk => async (dispatch) => {
    try {
        const res = await fetch(`${API_HOST}/api/favorites`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id}),
        });

        if (!res.ok) {
            throw new Error('Failed to toggle product at favorites');
        }

        const favorites = await res.json();

        dispatch(setFavoritesAC(favorites));
    } catch (e) {
        console.error(e);
    }
}