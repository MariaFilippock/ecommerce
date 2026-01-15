// import {combineReducers} from 'redux';
import {productsReducer} from '../store/products-reducer';
import { configureStore } from '@reduxjs/toolkit';


// let reducers = combineReducers({
//     productsData: productsReducer,
// });
// const initState = () => {
//     try {
//         const lsState = localStorage.getItem('ecommerce');
//         if (lsState === null) {
//             return undefined;
//         }
//         return JSON.parse(lsState);
//     } catch (err) {
//         console.error('Ошибка загрузки состояния из localStorage', err);
//         return undefined;
//     }
// };

// const persistedState = initState();

export const store = configureStore({
  reducer: {
    productsData: productsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.subscribe(() => {
//     try {
//         const savedState = JSON.stringify(store.getState());
//         localStorage.setItem('ecommerce', savedState);
//     } catch (err) {
//         console.error('Ошибка сохранения состояние в localStorage', err)
//     }
// });
