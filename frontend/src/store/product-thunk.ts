import {AppThunk} from '../store/types';
import {setIsAddingAC, setProductsAC} from '../store/products-reducer';
import {IProductType} from '../models';
import {message} from 'antd';


//получение списка товаров
export const setProductsThunk = (): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();

        dispatch(setProductsAC(products));
    } catch (e) {
        console.error('setProductsThunk error', e);
    }
}

//добавление нового товара в список товаров в админке
export const postNewProductThunk = (product: IProductType, onSuccessAdd: () => void): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsAddingAC(true));

        const res = await fetch('/api/products/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        });

        if (!res.ok) {
            message.error('Ошибка при добавлении товара!');
            return;
        }

        const productsRes = await fetch('/api/products');
        const products = await productsRes.json();

        dispatch(setProductsAC(products));
        message.success('Товар успешно добавлен!');
        onSuccessAdd();
    } catch (e) {
        console.error('postNewProductThunk', e);
        message.error('Ошибка при добавлении товара!');
    } finally {
        dispatch(setIsAddingAC(false));
    }
}

//удаление товара из списка товаров в админке
export const deleteProductThunk = (productId: string | number, onSuccessDelete: () => void): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsAddingAC(true));

        const res = await fetch('/api/products/', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })

        if (!res.ok) {
            message.error('Ошибка при удалении товара!');
            return;
        }

        const products = await res.json();

        dispatch(setProductsAC(products));
        message.success('Товар успешно удален!');
        onSuccessDelete();
    } catch (e) {
        message.error('Ошибка при удалении товара!');
    } finally {
        dispatch(setIsAddingAC(false));
    }
}

//редактирование товара
export const editProductThunk = (product: IProductType): AppThunk => async (dispatch) => {
    try {
        const res = await fetch('/api/products/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })

        if (!res.ok) {
            message.error('Ошибка при редактировании товара!');
            return;
        }

        const products = await res.json();

        dispatch(setProductsAC(products));
        message.success('Товар успешно отредактирован!');
    } catch (e) {
        message.error('Ошибка при редактировании товара!');
    }
}
