import {AnyAction} from 'redux';
import {SET_CART, SET_IS_ADDING, SET_PRODUCTS, TOGGLE_FAVORITE} from '../const';
import {ICartProductType, IProductsState, IProductType} from '../models';

let initialState: IProductsState = {
    products: [],
    cart: [],
    favorites: [],
    status: false,
}

export const productsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products,
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

export const setProductsAC = (products: IProductType[]) => ({
    type: SET_PRODUCTS,
    products
});

export const setCartAC = (cart: ICartProductType[]) => ({
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
