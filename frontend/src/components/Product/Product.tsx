import React from 'react';
import {IAppState, IProduct} from '../../models';
import {useSelector} from 'react-redux';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import styles from './styles.module.scss';
import {changeProductCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';
import {toggleFavoritesThunk} from '../../store/favorites-thunk';
import {Carousel} from 'antd';

interface IProps {
    product: IProduct;
    onCardClick: (product: number) => void;
}

const Product = ({product, onCardClick}: IProps) => {
    const favorites = useSelector((state: IAppState) => state.productsData.favorites ?? []);
    const isFavorite = favorites.some((favorite) => favorite.id === product.id);
    const dispatch = useAppDispatch();

    const handleAddProductAtCart = () => {
        const cartProduct = {...product, count: +1};
        dispatch(changeProductCountThunk(cartProduct));
    };

    const handleToggleFavorites = () => {
        dispatch(toggleFavoritesThunk(product.id));
    };

    return (
        <div className={styles.product}>
            <div className={styles.productImg}>
                <Carousel arrows infinite={false} rootClassName={styles.carouselContainer}>
                    {product.img?.map((url, index) =>
                        <div
                            key={`container-${index}`}
                            className={styles.carouselSlide}
                            onClick={event => event.stopPropagation()}
                        >
                            <img
                                key={`img-${index}`}
                                alt={`${product.title}-${index}`}
                                className={styles.carouselImg}
                                src={url}
                                onClick={() => onCardClick(product.id)}
                            />
                        </div>
                    )}
                </Carousel>

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
