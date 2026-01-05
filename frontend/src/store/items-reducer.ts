import {AnyAction} from 'redux';
import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, SET_ITEMS, TOGGLE_FAVORITE} from '../const';
import {ItemsState, ItemType} from '../models';

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
        case ADD_ITEM_TO_CART: {
            const itemId = action.payload;
            const exists = state.cart.some(el => el.id === itemId);
            const increaseCount = state.cart.map((i) => {
                return i.id === itemId
                    ? {...i, count: i.count + 1}
                    : i
            })

            return {
                ...state,
                cart: exists
                    ? increaseCount
                    : [...state.cart, {id: itemId, count: 1}]
            }
        }
        case REMOVE_ITEM_FROM_CART: {
            const itemId = action.payload;
            const foundItem = state.cart.find(el => el.id === itemId)!;
            const decreaseCount = state.cart.map((i) => {
                return i.id === itemId
                    ? {...i, count: i.count - 1}
                    : i
            })
            return {
                ...state,
                cart: foundItem.count > 1
                    ? decreaseCount
                    : state.cart.filter(i => i.id !== itemId)
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

export const addItemAtCartAC = (id: number) => ({
    type: ADD_ITEM_TO_CART,
    payload: id
});

export const removeItemFromCartAC = (id: number) => ({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
});

export const toggleFavoritesAC = (id: number) => ({
    type: TOGGLE_FAVORITE,
    payload: id
});
