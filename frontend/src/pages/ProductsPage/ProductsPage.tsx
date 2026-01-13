import React, {useEffect} from 'react';
import {IAppState, IProductType} from '../../models';
import Product from '../../components/Product/Product';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {setProductsThunk} from '../../store/product-thunk';
import {useAppDispatch} from '../../store/hooks';
import {useSelector} from 'react-redux';


const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useSelector((state: IAppState) => state.productsData.products);

    useEffect(() => {
        dispatch(setProductsThunk());
    }, [dispatch]);

    const handleDetailProductCardClick = (id: number) => {
        navigate(`${ROUTES.PRODUCTS}/${id}`);
    }

    return (
        <main>
            {products.map((el: IProductType) => (
                <Product onCardClick={handleDetailProductCardClick} key={el.id} product={el}/>
            ))}
        </main>
    );
};

export default ProductsPage;
