import {IStringDictionaryItem} from './helpers';

export const SET_ITEMS = 'SET_ITEMS'; // для списка товаров
export const SET_IS_ADDING = 'SET_IS_ADDING'; //статус добавления товара
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'; // добавляем в/убираем из избранное/го
export const SET_CART = 'SET_CART';

export const ROUTES = {
    ITEMS: '/items',
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

export const ITEM_CATEGORY_DICT: IStringDictionaryItem[] = [
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
    ITEMS_TABLE = 'ITEMS_TABLE',
    ADDITION = 'ADDITION',
    EDITING = 'EDITING',
}

export const Text = {
    Administration: {
        itemsTable: 'Список товаров',
        addition: 'Добавление товара',
        editing: 'Редактирование товара'

    }
}