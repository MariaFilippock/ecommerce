import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';
import {IProductType} from '../../models';

const DetailProductCardPage = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductType | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(err => console.error(err))
        }
    }, [id])

    if (!product) {
        return <div>Товар не найден или загружается…</div>;
    }

    return (
        <div className={styles.detailsContainer}>

            <div className={styles.imageContainer}>
                <img alt={product.title} src={`http://localhost:5001/img/${product.img}`}/>
            </div>
            <div className={styles.infoContainer}>
                <h2>{product.title}</h2>
                <h2 className={styles.price}>{product.price} $</h2>

                <div className={styles.description}>{product.desc}</div>

            </div>

        </div>
    );
};

export default DetailProductCardPage;