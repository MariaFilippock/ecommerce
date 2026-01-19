import {Select} from 'antd';
import styles from './index.scss';
import {IProduct} from './models';

const {Option} = Select;

/**
 * Опции для отрисовки выпадающего списка у Select'а
 * @param fullHeight Если true, то отображаем текст полностью, в несколько строк и без сокращений.
 */
interface IRenderOptionParams {
    fullHeight?: boolean;
}

export interface IStringDictionaryItem {
    id: string;
    label: string;
}

export interface INumberDictionaryItem {
    id: number;
    label: string;
}

/** Дополнительные данные, для option_data в обычной опции. */
export type TStringNumberDataOption = { label: string; id: string | number };

export const stringDictionaryItemConverter = (products: IProduct[]) => {
    let stringDictionaryArray = [];
    stringDictionaryArray = products.map((product) => {
        return {
            id: product.id.toString(),
            label: product.title
        }
    });
    return stringDictionaryArray;
}

/**
 * Функция для рендера списка опшенов у выпадашек.
 */
export const convertToSelectOptions = (
    dictionary: IStringDictionaryItem[] | INumberDictionaryItem[],
    params?: IRenderOptionParams
) => {
    const className = params?.fullHeight ? styles.selectOptionWithFullHeight : '';

    return dictionary.map(({id, label}: IStringDictionaryItem | INumberDictionaryItem) => {
        const optionData: TStringNumberDataOption = {id, label};

        return (
            <Option key={id} value={id} className={className} option_data={optionData}>
                {label}
            </Option>
        );
    });
};
