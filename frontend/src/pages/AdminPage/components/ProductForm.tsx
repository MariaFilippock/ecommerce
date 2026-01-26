import React from 'react';
import styles from '../AdminPage.module.scss';
import {RowField} from '../../../components/RowField/RowField';
import {GetProp, Input, Select, Upload, UploadFile, UploadProps} from 'antd';
import {FULL_WIDTH_STYLE, PRODUCT_CATEGORY_DICT} from '../../../const';
import {convertToSelectOptions} from '../../../helpers';
import ImgCrop from 'antd-img-crop';
import {IProduct} from '../../../models';

interface IProps {
    product: IProduct;
    changeProductDetails: (changes: Partial<IProduct>) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

    const handleImageUpload: UploadProps['customRequest'] = async (options) => {
        const {file, onSuccess, onError} = options;

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            changeProductDetails({img: [...(product.img || []), data.url]});

            onSuccess?.(data, file);
        } catch (e) {
            console.error(e);
            onError?.(e as any);
        }
    };

    const handleImageRemove = async (file: UploadFile) => {
        try {
            const res = await fetch('/api/delete-by-url', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: file.url})
            });

            const data = await res.json();

            changeProductDetails({img: product.img.filter(url => url !== data.url)});

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const imgList: UploadFile[] = product.img.map((url, index) => ({
        uid: url,
        name: `${url?.split('/')?.pop()}`,
        status: 'done',
        url,
    } as UploadFile));

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                <ImgCrop rotationSlider>
                    <Upload
                        customRequest={handleImageUpload}
                        multiple
                        fileList={imgList}
                        listType="picture-card"
                        onPreview={onPreview}
                        onRemove={handleImageRemove}
                    >
                        {imgList.length < 5 && '+ Загрузить'}
                    </Upload>
                </ImgCrop>
            </RowField>
        </div>
    );
};

export default ProductForm;