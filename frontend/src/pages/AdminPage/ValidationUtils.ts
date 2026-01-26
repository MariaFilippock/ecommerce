import {IProduct} from '../../models';
import {isNil, omitBy} from 'lodash';

export enum ERROR_FIELD_NAME {
    category = 'category',
    title = 'title',
    desc = 'desc',
    price = 'price',
}

/** Мапа полей с ошибками. */
export type TFormErrorMap = Record<ERROR_FIELD_NAME, string[] | undefined>;

export const REQUIRED_FIELD_MESSAGE = 'Поле обязательно для заполнения';


export const validateString = (str?: string | null): string[] | undefined => {
    return str ? undefined : [REQUIRED_FIELD_MESSAGE];
};

/**Запуск валидаторов после сабмита всей формы.*/
export function validateFormValues(formValues: IProduct): Partial<TFormErrorMap> {
    const errorsMap: Partial<TFormErrorMap> = {};

    errorsMap.desc = validateString(formValues.desc);
    errorsMap.category = validateString(formValues.category);
    errorsMap.title = validateString(formValues.title);
    errorsMap.price = validateString(formValues.price);

    return omitBy(errorsMap, isNil);
}
