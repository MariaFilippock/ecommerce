import {Col, Row, Tooltip, Typography} from 'antd';
import ErrorList from 'antd/es/form/ErrorList';
import {isEmpty} from 'lodash';
import * as React from 'react';
import styles from './RowField.module.scss';
import {dataScrollAttribute} from '../../const';
import {QuestionCircleOutlined} from '@ant-design/icons';

/**
 * @param [label] Лэйбл.
 * @param [labelSize] - Размер по ширине для лейбла на сетке.
 * @param [requiredMark] - Отображать или нет метку об обязательности поля. По умолчанию true, так как большая чатсь полей в системе обязательные.
 * @param [errors] Список ошибок.
 * @param [help] Подсказка.
 * @param [helpWidth] Ширина всплывашки с подсказкой.
 * @param [isTopLabel] - Если true, то лейбл поля будет расположен сверху.
 */
interface IProps {
    label?: string;
    labelSize?: number;
    requiredMark?: boolean;
    errors?: string[];
    help?: string | React.ReactNode;
    helpWidth?: number;
    isTopLabel?: boolean;
    children: React.ReactNode;
}

/**
 * Поле.
 */
const RowField: React.FC<IProps> = ({
    help = '',
    helpWidth = 300,
    requiredMark = true,
    errors,
    label = '',
    labelSize = 6,
    isTopLabel = false,
    children,
}) => {
    const hasErrors = !isEmpty(errors);
    const labelCls = styles.fieldLabel + ' ' + (requiredMark ? styles.requiredMark : '');
    const fieldCls = hasErrors ? 'ant-form-item-has-error' : '';

    /**
     * Отрисовка лейбла для поля
     */
    const renderLabel = () => {
        return (
            <>
                <Typography.Text className={labelCls}>{label}</Typography.Text>
                {help && (
                    <span className={styles.helpIconWrapper}>
                        <Tooltip title={help} overlayInnerStyle={{whiteSpace: 'pre-wrap', width: helpWidth}}>
                            <span className={styles.helpIcon}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                )}
            </>
        );
    };

    /**
     * Отрисовка блока с ошибками
     */
    const renderErrors = () => {
        return <div className={styles.errorContainer}>{hasErrors ? <ErrorList errors={errors} /> : null}</div>;
    };

    if (isTopLabel) {
        return (
            <Row gutter={[8, 16]} {...(hasErrors ? dataScrollAttribute : null)}>
                <Col span={24}>
                    <div>{renderLabel()}</div>
                    <div className={fieldCls}>{children}</div>
                    {renderErrors()}
                </Col>
            </Row>
        );
    }

    return (
        <Row gutter={[8, 16]} {...(hasErrors ? dataScrollAttribute : null)}>
            <Col span={labelSize}>
                <Row justify="end" align="middle">
                    {renderLabel()}
                </Row>
            </Col>
            <Col span={24 - labelSize}>
                <div className={fieldCls}>{children}</div>
                {renderErrors()}
            </Col>
        </Row>
    );
};

export {RowField};
