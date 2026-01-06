import React from 'react';
import {IAppState, ItemType} from '../../models';
import {useDispatch, useSelector} from 'react-redux';
import {addItemAtCartAC, toggleFavoritesAC} from '../../store/items-reducer';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import styles from './styles.module.scss';

interface ItemProps {
    item: ItemType;
    onCardClick: (item: number) => void;
}

const Item = ({item, onCardClick}: ItemProps) => {
    const favorites = useSelector((state: IAppState) => state.itemsData.favorites ?? []);
    const isFavorite = favorites.some((favoriteId) => favoriteId === item.id);
    const dispatch = useDispatch();

    const handleAddItemAtCart = () => {
        dispatch(addItemAtCartAC(item.id));
    };

    const handleToggleFavorites = () => {
        dispatch(toggleFavoritesAC(item.id));
    };

    return (
        <div className={styles.item}>
            <div className={styles.itemImg}>
                <img alt={item.title} src={`http://localhost:5001/img/${item.img}`} onClick={() => onCardClick(item.id)}/>
                <div className={styles.addCart} onClick={handleAddItemAtCart}>
                    Добавить в корзину
                </div>
            </div>

            <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>
                    <h3>{item.title}</h3>
                    {isFavorite
                        ? <HeartFilled onClick={handleToggleFavorites} className={styles.heartIcon}/>
                        : <HeartOutlined onClick={handleToggleFavorites} className={styles.heartIcon}/>
                    }
                </div>
                <b>{item.price} $</b>
            </div>
        </div>
    );
};

export default Item;
