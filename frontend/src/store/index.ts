import {combineReducers, createStore} from 'redux';
import {itemsReducer} from '../store/items-reducer';

let reducers = combineReducers({
    itemsData: itemsReducer,
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

const persistedState = initState();

export const store = createStore(reducers, persistedState);

store.subscribe(() => {
    try {
        const savedState = JSON.stringify(store.getState());
        localStorage.setItem('ecommerce', savedState);
    } catch (err) {
        console.error('Ошибка сохранения состояние в localStorage', err)
    }
});

