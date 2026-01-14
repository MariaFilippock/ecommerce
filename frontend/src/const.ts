import {IStringDictionaryItem} from './helpers';

// export const API_HOST = process.env.REACT_APP_API_URL;

export const SET_PRODUCTS = 'SET_PRODUCTS'; // для списка товаров
export const SET_IS_ADDING = 'SET_IS_ADDING'; //статус добавления товара
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'; // добавляем в/убираем из избранное/го
export const SET_CART = 'SET_CART';

export const ROUTES = {
    PRODUCTS: '/products',
};

/** Название атрибута, который добавляем к элементам для скролла к ним */
export const dataScrollKey = 'data-scroll-attribute';

/** Объект, который раскладываем через спред оператор при добавлении пропсы внутрь компонентов или элементов */
export const dataScrollAttribute = {[dataScrollKey]: true};


export const FULL_WIDTH_STYLE = {width: '100%'};

export enum ECategory {
    chairs = 'chairs',
    tables = 'tables',
    storage = 'storage',
}

export const PRODUCT_CATEGORY_DICT: IStringDictionaryItem[] = [
    {
        id: ECategory.storage,
        label: 'Хранение',
    },
    {
        id: ECategory.tables,
        label: 'Столы',
    },
    {
        id: ECategory.chairs,
        label: 'Стулья',
    }
];

//типы табов для модуля Администрирование
export enum EAdministrationTab {
    PRODUCTS_TABLE = 'PRODUCTS_TABLE',
}

export const Text = {
    Administration: {
        productsTable: 'Список товаров',
        addition: 'Добавление товара',
        editing: 'Редактирование товара'

    }
}