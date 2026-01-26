import React, {useState} from 'react';
import {IProduct} from '../../../models';
import {Button} from 'antd';
import ProductForm from '../components/ProductForm';
import {useAppDispatch} from '../../../store/hooks';
import {deleteProductThunk, editProductThunk} from '../../../store/product-thunk';
import styles from '../AdminPage.module.scss';
import {isEmpty} from 'lodash';
import {TFormErrorMap, validateFormValues} from './../ValidationUtils';

interface IProps {
    product: IProduct,
    onSuccessEdit: () => void
}

const EditProductForm = ({product, onSuccessEdit}: IProps) => {
    const dispatch = useAppDispatch();
    const [editedProduct, setEditedProduct] = useState(product);
    const [formErrors, setFormErrors] = useState<Partial<TFormErrorMap>>({});

    const changeProductDetails = (changes: Partial<IProduct>) => {
        setEditedProduct(state => ({
            ...state,
            ...changes
        }));
    }

    return (
        <div>
            <h3 className={styles.title}>Редактирование товара</h3>

            <ProductForm
                product={editedProduct}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                changeProductDetails={changeProductDetails}
            />
            <div className={styles.buttonsContainer}>
                <Button
                    type='primary'
                    onClick={() => {
                        const validationResult = validateFormValues(editedProduct);

                        if (isEmpty(validationResult)) {
                            dispatch(editProductThunk(editedProduct, onSuccessEdit))
                        } else {
                            setFormErrors(validationResult);
                        }
                    }}
                >
                    Сохранить изменения
                </Button>
                <Button
                    type='primary'
                    disabled={!editedProduct}
                    onClick={() => dispatch(deleteProductThunk(editedProduct.id, onSuccessEdit))}
                >
                    Удалить товар
                </Button>
            </div>
        </div>
    );
};

export default EditProductForm;