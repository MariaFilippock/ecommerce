import React, {useEffect} from 'react';
import {IAppState, IProduct} from '../../models';
import Product from '../../components/Product/Product';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {loadFavoritesThunk} from '../../store/favorites-thunk';
import styles from './styles.module.scss';
import {HeartOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';


const FavoritesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const favoritesList = useSelector((state: IAppState) => state.productsData.favorites);

    const handleProductsClick = () => {
        navigate(`${ROUTES.PRODUCTS}`);
    };

    useEffect(() => {
        dispatch(loadFavoritesThunk());
    }, [dispatch]);

    const handleDetailProductCardClick = (id: number) => {
        navigate(`${ROUTES.PRODUCTS}/${id}`);
    };

    return (
        <main>
            {favoritesList.length > 0 ? (
                favoritesList.map((favProduct: IProduct) => (
                    <Product key={favProduct.id} product={favProduct} onCardClick={handleDetailProductCardClick}/>
                ))
            ) : (
                <div className={styles.favoritesContainer}>
                    <div className={styles.messageEmptyFavorites}>
                        <HeartOutlined className={styles.shoppingOutlinedIcon}/>
                        <p className={styles.favoritesIsEmpty}>Ваше избранное пусто</p>
                        <button onClick={handleProductsClick} className={styles.toProducts}>В магазин</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default FavoritesPage;