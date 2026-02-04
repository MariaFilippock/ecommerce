export interface IProduct {
    id: number;
    title: string;
    img: string[];
    desc: string;
    category: string;
    price: string;
    totalCount: number;
}

export interface IProductAtCart {
    id: number;
    count: number;
}

export interface IProductsState {
    products: IProduct[];
    cart: IProductAtCart[];
    favorites: number[];
}
