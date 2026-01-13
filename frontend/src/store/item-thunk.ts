import {AppThunk} from '../store/types';
import {setIsAddingAC, setItemsAC} from '../store/items-reducer';
import {ItemType} from '../models';
import {message} from 'antd';


//получение списка товаров
export const setItemsThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/items');
        const items = await res.json();

        dispatch(setItemsAC(items));
    } catch (e) {
        console.error('setItemsThunk error', e);
    }
}

//добавление нового товара в список товаров в админке
export const postNewItemThunk = (item: ItemType, onSuccessAdd: () => void): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsAddingAC(true));

        const res = await fetch('/api/items/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });

        if (!res.ok) {
            message.error('Ошибка при добавлении товара!');
            return;
        }

        const itemsRes = await fetch('/api/items');
        const items = await itemsRes.json();

        dispatch(setItemsAC(items));
        message.success('Товар успешно добавлен!');
        onSuccessAdd();
    } catch (e) {
        console.error('postNewItemThunk', e);
        message.error('Ошибка при добавлении товара!');
    } finally {
        dispatch(setIsAddingAC(false));
    }
}

//удаление товара из списка товаров в админке
export const deleteItemThunk = (itemId: string | number, onSuccessDelete: () => void): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsAddingAC(true));

        const res = await fetch(`/api/items/${itemId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })

        if (!res.ok) {
            message.error('Ошибка при удалении товара!');
            return;
        }

        const items = await res.json();

        dispatch(setItemsAC(items));
        message.success('Товар успешно удален!');
        onSuccessDelete();
    } catch (e) {
        message.error('Ошибка при удалении товара!');
    } finally {
        dispatch(setIsAddingAC(false));
    }
}

//редактирование товара
export const editItemThunk = (item: ItemType): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/items/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        })

        if (!res.ok) {
            message.error('Ошибка при редактировании товара!');
            return;
        }

        const items = await res.json();

        dispatch(setItemsAC(items));
        message.success('Товар успешно отредактирован!');
    } catch (e) {
        message.error('Ошибка при редактировании товара!');
    }
}


