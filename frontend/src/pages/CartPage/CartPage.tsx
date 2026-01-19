import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {ShoppingOutlined} from '@ant-design/icons';
import CartProduct from '../../components/CartProduct/CartProduct';
import Utils from '../../CartUtils';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {loadCartThunk} from '../../store/cart-thunks';
import {useSelector} from 'react-redux';
import {IAppState} from '../../models';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {cart, isLoading} = useSelector((state: IAppState) => state.productsData);
    console.log(cart);
    useEffect(() => {
        dispatch(loadCartThunk());
    }, [dispatch]);

    const handleProductsClick = () => {
        navigate(`${ROUTES.PRODUCTS}`);
    };

    const quantity = Utils.cartProductsQuantity(cart);
    const totalCost = Utils.cartProductsTotalCost(cart);

    if (isLoading) return <p>Загрузка корзины...</p>;

    return (
        <div className={styles.cartContent}>
            <h2>Корзина</h2>

            <>
                {cart.length > 0 ? (
                        <div className={styles.fullContainer}>
                            <div className={styles.products}>
                                {cart.map((product) => (
                                        <CartProduct key={product.id} product={product}/>
                                    )
                                )}
                            </div>
                            <div className={styles.orderInfoContainer}>
                                <h3>Информация по заказу</h3>

                                <div className={styles.orderInfo}>
                                    <div>
                                        <div className={styles.text}>Количество</div>
                                        <div>{quantity} шт</div>
                                    </div>
                                    <div>
                                        <div className={styles.text}>Общая стоимость товаров</div>
                                        <div>{totalCost} $</div>
                                    </div>
                                    <div>
                                        <div className={styles.text}>Итого</div>
                                        <div>{totalCost} $</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                    : (
                        <div className={styles.cartContainer}>
                            <div className={styles.messageEmptyCart}>
                                <ShoppingOutlined className={styles.shoppingOutlinedIcon}/>
                                <p className={styles.cartIsEmpty}>Ваша корзина пуста</p>
                                <button onClick={handleProductsClick} className={styles.toProducts}>В магазин</button>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    );
};

export default CartPage;
