import React from 'react';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IAppState} from '../../models';

const ItemDetailCardPage = () => {
    const {id} = useParams<{ id: string }>();

    const item = useSelector((state: IAppState) => state.itemsData.items.find(i => i.id === Number(id)))!;

    return (
        <div className={styles.detailsContainer}>

            <div className={styles.imageContainer}>
                <img alt={item.title} src={'./img/' + item.img}/>
            </div>
            <div className={styles.infoContainer}>
                <h2>{item.title}</h2>
                <h2 className={styles.price}>{item.price} $</h2>

                <div className={styles.description}>{item.desc}</div>

            </div>

        </div>
    );
};

export default ItemDetailCardPage;