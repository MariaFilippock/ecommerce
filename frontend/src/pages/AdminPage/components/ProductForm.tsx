import React from 'react';
import styles from '../AdminPage.module.scss';
import {RowField} from '../../../components/RowField/RowField';
import {GetProp, Input, InputNumber, Select, Upload, UploadFile, UploadProps} from 'antd';
import {FULL_WIDTH_STYLE, PRODUCT_CATEGORY_DICT} from '../../../const';
import {convertToSelectOptions} from '../../../helpers';
import ImgCrop from 'antd-img-crop';
import {IProduct} from '../../../models';
import {omit} from 'lodash';
import {ERROR_FIELD_NAME, TFormErrorMap} from './../ValidationUtils';

interface IProps {
    product: IProduct;
    changeProductDetails: (changes: Partial<IProduct>) => void;
    formErrors: Partial<TFormErrorMap>;
    setFormErrors: (errors: Partial<TFormErrorMap>) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ProductForm = ({product, changeProductDetails, formErrors, setFormErrors}: IProps) => {

    const handleCategoryChange = (value: string) => {
        changeProductDetails({category: value});
        setFormErrors(omit(formErrors, [ERROR_FIELD_NAME.category]));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeProductDetails({title: e.target.value});
        setFormErrors(omit(formErrors, [ERROR_FIELD_NAME.title]));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeProductDetails({desc: e.target.value});
        setFormErrors(omit(formErrors, [ERROR_FIELD_NAME.desc]));
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

    const handleImageRemove = (file: UploadFile) => {
        try {
            changeProductDetails({img: product.img.filter(url => url !== file.url)});
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
            <RowField label='Название товара' errors={formErrors.title}>
                <Input type='text'
                       value={product.title}
                       placeholder='Введите название товара'
                       onChange={handleTitleChange}
                />
            </RowField>

            <RowField label='Вид товара' errors={formErrors.category}>
                <Select value={product.category} style={FULL_WIDTH_STYLE} onChange={handleCategoryChange}>
                    {convertToSelectOptions(PRODUCT_CATEGORY_DICT)}
                </Select>
            </RowField>

            <RowField label='Описание' errors={formErrors.desc}>
                <Input
                    type='text'
                    value={product.desc}
                    placeholder='Введите описание товара'
                    onChange={handleDescriptionChange}
                />
            </RowField>

            <RowField label='Цена' errors={formErrors.price}>
                <InputNumber<number>
                    value={Number(product.price) || 0}
                    placeholder='Введите цену товара в долларах'
                    onChange={(value: number | null) => changeProductDetails({price: value !== null ? String(value) : ''})}
                    formatter={(value?: number) => {
                        if (value === undefined) return '';
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    }}
                    parser={(value?: string) => {
                        if (!value) return 0;
                        return Number(value.replace(/ /g, ''));
                    }}
                    style={{width: '100%'}}
                />
            </RowField>

            <RowField label='Изображение' requiredMark={false}>
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