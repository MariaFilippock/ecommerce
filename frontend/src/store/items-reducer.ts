import {AnyAction} from 'redux';
import {SET_CART, SET_IS_ADDING, SET_ITEMS, TOGGLE_FAVORITE} from '../const';
import {ItemAtCartType, ItemsState, ItemType} from '../models';

let initialState: ItemsState = {
    items: [],
    cart: [],
    favorites: [],
    status: false,
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
            return {
                ...state,
                favorites: action.payload,
            }
        }
        case SET_IS_ADDING: {
            return {
                ...state,
                status: action.status,
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
});

export const setFavoritesAC = (favorites: number[]) => ({
    type: TOGGLE_FAVORITE,
    payload: favorites
});

export const setIsAddingAC = (status: boolean) => ({
    type: SET_IS_ADDING,
    status
});
