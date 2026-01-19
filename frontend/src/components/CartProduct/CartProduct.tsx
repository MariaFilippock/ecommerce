import React from 'react';
import styles from './styles.module.scss';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {ICartProduct} from '../../models';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../const';
import CartUtils from '../../CartUtils';
import {changeProductCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';
import {Carousel} from 'antd';

interface IProps {
    product: ICartProduct,
}


const CartProduct = ({product}: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalCost = CartUtils.totalCostPerProduct(product);

    const handleRemoveProductFromCart = () => {
        const cartProduct = {...product, count: -1};
        dispatch(changeProductCountThunk(cartProduct));
    };

    const handleAddProductToCart = () => {
        const cartProduct = {...product, count: +1};
        dispatch(changeProductCountThunk(cartProduct));
    };

    const handleDetailProductCardClick = () => {
        navigate(`${ROUTES.PRODUCTS}/${product.id}`);
    };

    return (
        <div className={styles.product}>
            <Carousel arrows infinite={false} rootClassName={styles.carouselContainer}>
                {product.img?.map((url, index) =>
                    <div key={index} className={styles.carouselSlide}>
                            <img
                                alt={`${product.title}-${index}`}
                                src={url}
                                onClick={handleDetailProductCardClick}
                                className={styles.carouselImg}
                            />
                    </div>
                )}
            </Carousel>

            <div className={styles.productInfo}>
                <h3 className={styles.productTitle} onClick={handleDetailProductCardClick}>{product.title}</h3>

                <div className={styles.priceQuantityWrapper}>
                    <div>{totalCost} $</div>

                    <div className={styles.productQuantitySelector}>
                        <MinusOutlined className={styles.minus} onClick={handleRemoveProductFromCart}/>
                        <span className={styles.count}>{product.count}</span>
                        <PlusOutlined className={styles.plus} onClick={handleAddProductToCart}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
