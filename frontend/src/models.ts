export interface IAppState {
    productsData: IProductsState;
}

export interface IProductsState {
    products: IProduct[];
    cart: ICartProduct[];
    favorites: IProduct[];
    status: boolean;
    isLoading: boolean;
}

export interface IProduct {
    id: number;
    title: string;
    img: string[];
    desc: string;
    category: string;
    price: string;
}

export interface ICartProduct extends IProduct {
    count: number;
}
