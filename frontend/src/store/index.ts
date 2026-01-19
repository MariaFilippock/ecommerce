import {productsReducer} from '../store/products-reducer';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        productsData: productsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
