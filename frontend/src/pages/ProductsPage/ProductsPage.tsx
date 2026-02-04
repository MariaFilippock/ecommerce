import React, {useEffect} from 'react';
import {IAppState, IProduct} from '../../models';
import Product from '../../components/Product/Product';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {loadProductsThunk} from '../../store/product-thunk';
import {useAppDispatch} from '../../store/hooks';
import {useSelector} from 'react-redux';
import styles from './ProductsPage.module.scss';

const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useSelector((state: IAppState) => state.productsData.products);

    const existedProducts = products.filter(product => product.totalCount !== 0);

    useEffect(() => {
        dispatch(loadProductsThunk());
    }, [dispatch]);

    const handleDetailProductCardClick = (id: number) => {
        navigate(`${ROUTES.PRODUCTS}/${id}`);
    }

    return (
        <div className={styles.wrapper}>
            {existedProducts.map((el: IProduct) => (
                <Product onCardClick={handleDetailProductCardClick} key={el.id} product={el}/>
            ))}
        </div>
    );
};

export default ProductsPage;
