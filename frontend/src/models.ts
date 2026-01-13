export interface IAppState {
    productsData: IProductsState;
}

export interface IProductsState {
    products: IProductType[];
    cart: ICartProductType[];
    favorites: number[];
    status: boolean;
}

export interface IProductType {
    id: number;
    title: string;
    img: string;
    desc: string;
    category: string;
    price: string;
}

export interface ICartProductType {
    id: number;
    count: number;
}

export type detailedCartProductType = IProductType & {count: number}

