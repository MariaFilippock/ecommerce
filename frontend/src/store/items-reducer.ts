import {AnyAction} from 'redux';
import {SET_CART, SET_ITEMS, TOGGLE_FAVORITE} from '../const';
import {ItemAtCartType, ItemsState, ItemType} from '../models';

let initialState: ItemsState = {
    items: [],
    cart: [],
    favorites: [],
}

export const itemsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_ITEMS: {
            return {
                ...state,
                items: action.items,
            }
        }
        case SET_CART: {
            return {
                ...state,
                cart: action.payload,
            }
        }
        case TOGGLE_FAVORITE: {
            const id = action.payload;
            const isFavorite = state.favorites.find(idItem => idItem === id);
            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter(i => i !== id)
                    : [...state.favorites, id],
            }
        }
        default:
            return state;
    }
}

export const setItemsAC = (items: ItemType[]) => ({
    type: SET_ITEMS,
    items
});

export const setCartAC = (cart: ItemAtCartType[]) => ({
    type: SET_CART,
    payload: cart
})

export const toggleFavoritesAC = (id: number) => ({
    type: TOGGLE_FAVORITE,
    payload: id
});
