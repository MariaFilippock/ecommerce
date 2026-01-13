import React from 'react';
import styles from './styles.module.scss';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {detailedCartProductType} from '../../models';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../const';
import CartUtils from '../../CartUtils';
import {changeProductCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';

interface IProps {
    product: detailedCartProductType,
}

const CartProduct = ({product}: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalCost = CartUtils.totalCostPerProduct(product);

    const handleRemoveProductFromCart = () => {
        dispatch(changeProductCountThunk(product.id, -1));
    };

    const handleAddProductToCart = () => {
        dispatch(changeProductCountThunk(product.id, +1));
    };

    const handleDetailProductCardClick = () => {
        navigate(`${ROUTES.PRODUCTS}/${product.id}`);
    };

    return (
        <div className={styles.product}>
            <div className={styles.productImg} onClick={handleDetailProductCardClick}>
                <img alt={product.title} src={`/img/${product.img}`}/>
            </div>

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
