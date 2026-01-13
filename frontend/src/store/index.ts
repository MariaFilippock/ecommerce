import {applyMiddleware, combineReducers, createStore} from 'redux';
import {productsReducer} from '../store/products-reducer';
import {thunk} from 'redux-thunk';



let reducers = combineReducers({
    productsData: productsReducer,
});

const initState = () => {
    try {
        const lsState = localStorage.getItem('ecommerce');
        if (lsState === null) {
            return undefined;
        }
        return JSON.parse(lsState);
    } catch (err) {
        console.error('Ошибка загрузки состояния из localStorage', err);
        return undefined;
    }
};

export type RootState = ReturnType<typeof reducers>;

const persistedState = initState();

export const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    try {
        const savedState = JSON.stringify(store.getState());
        localStorage.setItem('ecommerce', savedState);
    } catch (err) {
        console.error('Ошибка сохранения состояние в localStorage', err)
    }
});

