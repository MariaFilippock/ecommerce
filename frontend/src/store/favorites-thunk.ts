import {AppThunk} from '../store/types';
import {setFavoritesAC} from '../store/items-reducer';


export const setFavoritesThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/favorites');
        const data = await res.json();

        dispatch(setFavoritesAC(data));
    } catch (e) {
        console.error('setFavoritesThunk');
    }
}

export const toggleFavoritesThunk = (id: number): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id}),
        });

        if (!res.ok) {
            throw new Error('Failed to toggle item at favorites');
        }

        const favorites = await res.json();

        dispatch(setFavoritesAC(favorites));
    } catch (e) {
        console.error(e);
    }
}