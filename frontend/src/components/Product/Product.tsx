import React from 'react';
import {IAppState, IProductType} from '../../models';
import {useSelector} from 'react-redux';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import styles from './styles.module.scss';
import {changeProductCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';
import {toggleFavoritesThunk} from '../../store/favorites-thunk';

interface IProps {
    product: IProductType;
    onCardClick: (product: number) => void;
}

const Product = ({product, onCardClick}: IProps) => {
    const favorites = useSelector((state: IAppState) => state.productsData.favorites ?? []);
    const isFavorite = favorites.some((favoriteId) => favoriteId === product.id);
    const dispatch = useAppDispatch();

    const handleAddProductAtCart = () => {
        dispatch(changeProductCountThunk(product.id, +1));
    };

    const handleToggleFavorites = () => {
        dispatch(toggleFavoritesThunk(product.id));
    };

    return (
        <div className={styles.product}>
            <div className={styles.productImg}>
                <img alt={product.title} src={`/img/${product.img}`} onClick={() => onCardClick(product.id)}/>
                <div className={styles.addCart} onClick={handleAddProductAtCart}>
                    Добавить в корзину
                </div>
            </div>

            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    <h3>{product.title}</h3>
                    {isFavorite
                        ? <HeartFilled onClick={handleToggleFavorites} className={styles.heartIcon}/>
                        : <HeartOutlined onClick={handleToggleFavorites} className={styles.heartIcon}/>
                    }
                </div>
                <b>{product.price} $</b>
            </div>
        </div>
    );
};

export default Product;
