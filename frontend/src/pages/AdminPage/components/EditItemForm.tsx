import React, {useState} from 'react';
import {ItemType} from '../../../models';
import {Button} from 'antd';
import ProductForm from '../components/ProductForm';
import {useAppDispatch} from '../../../store/hooks';
import {deleteItemThunk, editItemThunk} from '../../../store/item-thunk';
import styles from '../AdminPage.module.scss';

interface IProps {
    item: ItemType,
    onSuccessDelete: () => void
}

const EditItemForm = ({item, onSuccessDelete}: IProps) => {
    const dispatch = useAppDispatch();
    const [editedItem, setEditedItem] = useState(item);


    const changeItemDetails = (changes: Partial<ItemType>) => {
        setEditedItem(state => ({
            ...state,
            ...changes
        }));
    }

    return (
        <div>
            <h3 className={styles.title}>Редактирование товара</h3>

            <ProductForm item={editedItem} changeItemDetails={changeItemDetails}/>
            <div className={styles.buttonsContainer}>
                <Button
                    type='primary'
                    onClick={() => dispatch(editItemThunk(editedItem))}
                >
                    Сохранить изменения
                </Button>
                <Button
                    type='primary'
                    disabled={!editedItem}
                    onClick={() => dispatch(deleteItemThunk(editedItem.id, onSuccessDelete))}
                >
                    Удалить товар
                </Button>
            </div>
        </div>
    );
};

export default EditItemForm;