import React, {useState} from 'react';
import styles from '../AdminPage.module.scss';
import {Button} from 'antd';
import {useAppDispatch} from '../../../store/hooks';
import {IAppState, IProduct} from '../../../models';
import {useSelector} from 'react-redux';
import {postNewProductThunk} from '../../../store/product-thunk';
import ProductForm from '../components/ProductForm';
import {isEmpty} from 'lodash';
import {TFormErrorMap, validateFormValues} from '../ValidationUtils';

interface IProps {
    onSuccessAdd: () => void
}

const defaultProduct = {
    id: -1,
    title: '',
    img: [],
    desc: '',
    category: '',
    price: ''
};

const AddProductForm = ({onSuccessAdd}: IProps) => {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<IProduct>(defaultProduct as IProduct);
    const [formErrors, setFormErrors] = useState<Partial<TFormErrorMap>>({});
    const status = useSelector((state: IAppState) => state.productsData.status);

    const changeProductDetails = (changes: Partial<IProduct>) => {
        setProduct(state => ({
            ...state,
            ...changes,
        }));
    }

    const handleAddNewProduct = () => {
        const validationResult = validateFormValues(product);

        if (isEmpty(validationResult)) {
            dispatch(postNewProductThunk(product, onSuccessAdd));
            setProduct(defaultProduct);
        } else {
            setFormErrors(validationResult);
        }
    }

    return (
        <>
            <h3 className={styles.title}>Добавление нового товара</h3>

            <ProductForm
                product={product}
                changeProductDetails={changeProductDetails}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
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