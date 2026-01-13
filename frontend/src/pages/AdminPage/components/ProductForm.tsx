import React from 'react';
import styles from '../AdminPage.module.scss';
import {RowField} from '../../../components/RowField/RowField';
import {Button, Input, Select, Upload} from 'antd';
import {FULL_WIDTH_STYLE, PRODUCT_CATEGORY_DICT} from '../../../const';
import {convertToSelectOptions} from '../../../helpers';
import {UploadOutlined} from '@ant-design/icons';
import {IProductType} from '../../../models';

interface IProps {
    product: IProductType;
    changeProductDetails: (changes: Partial<IProductType>) => void;
}

const ProductForm = ({product, changeProductDetails}: IProps) => {

    const handleCategoryChange = (value: string) => {
        changeProductDetails({category: value});
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeProductDetails({title: e.target.value});
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeProductDetails({desc: e.target.value});
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeProductDetails({price: e.target.value});
    };

    const handleImageUpload = (info: any) => {
        if (info.file && info.file.name) {
            changeProductDetails({img: info.file.name});
        }
    };

    return (
        <div className={styles.addNewProductContainer}>
            <RowField label='Название товара'>
                <Input type='text'
                       value={product.title}
                       placeholder='Введите название товара'
                       onChange={handleTitleChange}
                />
            </RowField>

            <RowField label='Вид товара'>
                <Select value={product.category} style={FULL_WIDTH_STYLE} onChange={handleCategoryChange}>
                    {convertToSelectOptions(PRODUCT_CATEGORY_DICT)}
                </Select>
            </RowField>

            <RowField label='Описание'>
                <Input
                    type='text'
                    value={product.desc}
                    placeholder='Введите описание товара'
                    onChange={handleDescriptionChange}
                />
            </RowField>

            <RowField label='Цена'>
                <Input
                    type='text'
                    value={product.price}
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