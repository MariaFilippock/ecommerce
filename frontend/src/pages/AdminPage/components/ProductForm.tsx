import React from 'react';
import styles from '../AdminPage.module.scss';
import {RowField} from '../../../components/RowField/RowField';
import {Button, Input, Select, Upload} from 'antd';
import {FULL_WIDTH_STYLE, ITEM_CATEGORY_DICT} from '../../../const';
import {convertToSelectOptions} from '../../../helpers';
import {UploadOutlined} from '@ant-design/icons';
import {ItemType} from '../../../models';

interface IProps {
    item: ItemType;
    changeItemDetails: (changes: Partial<ItemType>) => void;
}

const ProductForm = ({item, changeItemDetails}: IProps) => {

    const handleCategoryChange = (value: string) => {
       changeItemDetails({category: value});
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeItemDetails({title: e.target.value});
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeItemDetails({desc: e.target.value});
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeItemDetails({price: e.target.value});
    };

    const handleImageUpload = (info: any) => {
        if (info.file && info.file.name) {
            changeItemDetails({img: info.file.name});
        }
    };

    return (
        <div className={styles.addNewItemContainer}>
            <RowField label='Вид товара'>
                <Select value={item.category} style={FULL_WIDTH_STYLE} onChange={handleCategoryChange}>
                    {convertToSelectOptions(ITEM_CATEGORY_DICT)}
                </Select>
            </RowField>

            <RowField label='Название товара'>
                <Input type='text'
                       value={item.title}
                       placeholder='Введите название товара'
                       onChange={handleTitleChange}
                />
            </RowField>

            <RowField label='Описание'>
                <Input
                    type='text'
                    value={item.desc}
                    placeholder='Введите описание товара'
                    onChange={handleDescriptionChange}
                />
            </RowField>

            <RowField label='Цена'>
                <Input
                    type='text'
                    value={item.price}
                    placeholder='Введите цену товара в долларах'
                    onChange={handlePriceChange}
                />
            </RowField>

            <RowField label='Изображение'>
                <Upload beforeUpload={() => false} onChange={handleImageUpload}>
                    <Button icon={<UploadOutlined/>}>Загрузить</Button>
                </Upload>
            </RowField>
        </div>
    );
};

export default ProductForm;