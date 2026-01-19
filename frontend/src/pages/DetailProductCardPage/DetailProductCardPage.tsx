import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';
import {IProduct} from '../../models';
import {changeProductCountThunk} from '../../store/cart-thunks';
import {useAppDispatch} from '../../store/hooks';

const DetailProductCardPage = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(err => console.error(err))
        }
    }, [id])

    const handleAddProductAtCart = () => {
        if (product) {
            const cartProduct = {...product, count: +1};
            dispatch(changeProductCountThunk(cartProduct));
        }
    }

    if (!product) {
        return <div>Товар не найден или загружается…</div>;
    }

    return (
        <div className={styles.detailsContainer}>

            <div className={styles.imageContainer}>
                {product?.img.map((url, index) =>
                    <img key={`${product?.title}-${index}`} alt={product?.title} src={url}/>
                )}

            </div>
            <div className={styles.infoContainer}>
                <h2>{product?.title}</h2>
                <h2 className={styles.price}>{product.price} $</h2>

                <div className={styles.description}>{product.desc}</div>

                <div className={styles.addCart} onClick={handleAddProductAtCart}>
                    Добавить в корзину
                </div>

            </div>

        </div>
    );
};

export default DetailProductCardPage;