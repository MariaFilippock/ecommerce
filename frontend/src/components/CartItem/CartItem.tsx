import React from 'react';
import styles from './styles.module.scss';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {detailedCartItemType} from '../../models';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../const';
import CartUtils from '../../CartUtils';
import {changeItemCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';

interface IProps {
    item: detailedCartItemType,
}

const CartItem = ({item}: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalCost = CartUtils.totalCostPerItem(item);

    const handleRemoveItemFromCart = () => {
        dispatch(changeItemCountThunk(item.id, -1));
    };

    const handleAddItemToCart = () => {
        dispatch(changeItemCountThunk(item.id, +1));
    };

    const handleItemDetailCardClick = () => {
        navigate(`${ROUTES.ITEMS}/${item.id}`);
    };

    return (
        <div className={styles.item}>
            <div className={styles.itemImg} onClick={handleItemDetailCardClick}>
                <img alt={item.title} src={`/img/${item.img}`}/>
            </div>

            <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle} onClick={handleItemDetailCardClick}>{item.title}</h3>

                <div className={styles.priceQuantityWrapper}>
                    <div>{totalCost} $</div>

                    <div className={styles.itemQuantitySelector}>
                        <MinusOutlined className={styles.minus} onClick={handleRemoveItemFromCart}/>
                        <span className={styles.count}>{item.count}</span>
                        <PlusOutlined className={styles.plus} onClick={handleAddItemToCart}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
