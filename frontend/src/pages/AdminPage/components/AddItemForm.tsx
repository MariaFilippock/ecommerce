import React, {useState} from 'react';
import styles from '../AdminPage.module.scss';
import {Button} from 'antd';
import {useAppDispatch} from '../../../store/hooks';
import {IAppState, ItemType} from '../../../models';
import {useSelector} from 'react-redux';
import {postNewItemThunk} from '../../../store/item-thunk';
import ProductForm from '../components/ProductForm';

interface IProps {
    onSuccessAdd: () => void
}

const defaultItem = {
    id: -1,
    title: '',
    img: '',
    desc: '',
    category: '',
    price: ''
};

const AddItemForm = ({onSuccessAdd}: IProps) => {
    const dispatch = useAppDispatch();
    const [item, setItem] = useState<ItemType>(defaultItem as ItemType);
    const status = useSelector((state: IAppState) => state.itemsData.status);

    const changeItemDetails = (changes: Partial<ItemType>) => {
        setItem(state => ({
            ...state,
            ...changes,
        }));
    }

    const handleAddNewItem = async () => {
        dispatch(postNewItemThunk(item, onSuccessAdd));
        setItem(defaultItem);
    }

    return (
        <>
            <h3 className={styles.title}>Добавление нового товара</h3>

            <ProductForm
                item={item}
                changeItemDetails={changeItemDetails}
            />

            <div className={styles.buttonsContainer}>
                <Button
                    type='primary'
                    loading={status}
                    disabled={status}
                    onClick={handleAddNewItem}
                >
                    Добавить
                </Button>
            </div>
        </>
    );
};

export default AddItemForm;