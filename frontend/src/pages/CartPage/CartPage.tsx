import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {ShoppingOutlined} from '@ant-design/icons';
import CartItem from '../../components/CartItem/CartItem';
import Utils from '../../CartUtils';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {setCartThunk} from '../../store/cart-thunks';
import {useSelector} from 'react-redux';
import {detailedCartItemType, IAppState} from '../../models';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useSelector((state: IAppState) =>
        state.itemsData.cart
            .map((cartItem) => {
                const product = state.itemsData.items.find(item => item.id === cartItem.id);

                if (!product) return null;

                return {
                    ...product,
                    count: cartItem.count
                }
            })
            .filter((i): i is detailedCartItemType => i !== null)
    );

    useEffect(() => {
        dispatch(setCartThunk());
    }, [dispatch]);

    const handleItemsClick = () => {
        navigate(`${ROUTES.ITEMS}`);
    };

    const quantity = Utils.cartItemsQuantity(cartItems);
    const totalCost = Utils.cartItemsTotalCost(cartItems);

    return (
        <div className={styles.cartContent}>
            <h2>Корзина</h2>

            <>
                {cartItems.length > 0 ? (
                        <div className={styles.fullContainer}>
                            <div className={styles.items}>
                                {cartItems.map((item) => (
                                        <CartItem key={item.id} item={item}/>
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
                                <button onClick={handleItemsClick} className={styles.toItems}>В магазин</button>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    );
};

export default CartPage;
