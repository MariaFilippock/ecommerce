import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';
import {ItemType} from '../../models';

const ItemDetailCardPage = () => {
    const {id} = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemType | null>(null);

    useEffect(() => {
        if (!item && id) {
            fetch(`http://localhost:5001/api/items/${id}`)
                .then(res => res.json())
                .then(data => setItem(data))
                .catch(err => console.error(err))
        }
    }, [])

    if (!item) {
        return <div>Товар не найден или загружается…</div>;
    }

    return (
        <div className={styles.detailsContainer}>

            <div className={styles.imageContainer}>
                <img alt={item.title} src={`http://localhost:5001/img/${item.img}`}/>
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