export interface IProductType {
    id: number;
    title: string;
    img: string;
    desc: string;
    category: string;
    price: string;
}

export interface IProductAtCartType {
    id: number;
    count: number;
}

export interface IProductsStateType {
    products: IProductType[];
    cart: IProductAtCartType[];
    favorites: number[];
}
