import {AnyAction} from 'redux';
import {SET_CART, SET_IS_ADDING, SET_IS_LOADING, SET_PRODUCTS, TOGGLE_FAVORITE} from '../const';
import {ICartProduct, IProductsState, IProduct} from '../models';

let initialState: IProductsState = {
    products: [],
    cart: [],
    favorites: [],
    status: false,
    isLoading: false,
}

export const productsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products as IProduct[],
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
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state;
    }
}

export const setProductsAC = (products: IProduct[]) => ({
    type: SET_PRODUCTS,
    products
});

export const setCartAC = (cart: ICartProduct[]) => ({
    type: SET_CART,
    payload: cart
});

export const setFavoritesAC = (favorites: IProduct[]) => ({
    type: TOGGLE_FAVORITE,
    payload: favorites
});

export const setIsAddingAC = (status: boolean) => ({
    type: SET_IS_ADDING,
    status
});

export const setIsLoadingAC = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    isLoading
});
