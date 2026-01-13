import React, {useState} from 'react';
import styles from '../AdminPage.module.scss';
import {Button} from 'antd';
import {useAppDispatch} from '../../../store/hooks';
import {IAppState, IProductType} from '../../../models';
import {useSelector} from 'react-redux';
import {postNewProductThunk} from '../../../store/product-thunk';
import ProductForm from '../components/ProductForm';

interface IProps {
    onSuccessAdd: () => void
}

const defaultProduct = {
    id: -1,
    title: '',
    img: '',
    desc: '',
    category: '',
    price: ''
};

const AddProductForm = ({onSuccessAdd}: IProps) => {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<IProductType>(defaultProduct as IProductType);
    const status = useSelector((state: IAppState) => state.productsData.status);

    const changeProductDetails = (changes: Partial<IProductType>) => {
        setProduct(state => ({
            ...state,
            ...changes,
        }));
    }

    const handleAddNewProduct = async () => {
        dispatch(postNewProductThunk(product, onSuccessAdd));
        setProduct(defaultProduct);
    }

    return (
        <>
            <h3 className={styles.title}>Добавление нового товара</h3>

            <ProductForm
                product={product}
                changeProductDetails={changeProductDetails}
            />

            <div className={styles.buttonsContainer}>
                <Button
                    type='primary'
                    loading={status}
                    disabled={status}
                    onClick={handleAddNewProduct}
                >
                    Добавить
                </Button>
            </div>
        </>
    );
};

export default AddProductForm;