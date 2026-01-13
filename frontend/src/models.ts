export interface IAppState {
    itemsData: ItemsState;
}

//модель одного редьюсера
export interface ItemsState {
    items: ItemType[];
    cart: ItemAtCartType[];
    favorites: number[];
    status: boolean;
}

export interface ItemType {
    id: number;
    title: string;
    img: string;
    desc: string;
    category: string;
    price: string;
}

export interface ItemAtCartType {
    id: number;
    count: number;
}

export type detailedCartItemType = ItemType & {count: number}

