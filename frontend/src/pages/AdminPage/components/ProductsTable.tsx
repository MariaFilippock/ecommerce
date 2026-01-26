import React from 'react';
import {Table} from 'antd';
import {IProduct} from '../../../models';
import {ColumnsType} from 'antd/es/table';
import styles from '../AdminPage.module.scss';

interface IProps {
    products: IProduct[];
    onProductClick?: (product: IProduct) => void;
}

const ProductsTable = ({products, onProductClick}: IProps) => {
    const productColumns = [
        {
            key: 'id',
            title: 'id',
            dataIndex: 'id',
        },
        {
            key: 'title',
            title: 'Название',
            dataIndex: 'title'
        },
        {
            key: 'desc',
            title: 'Описание товара',
            dataIndex: 'desc',
        },
        {
            key: 'category',
            title: 'Категория товара',
            dataIndex: 'category'
        },
        {
            key: 'price',
            title: 'Цена товара',
            dataIndex: 'price'
        },
        {
            key: 'img',
            title: 'Изображение',
            dataIndex: 'img',
            render: (imgs: string[]) => (
                <div className={styles.imgsGroup}>
                    {imgs.slice(0,2).map((src, i) => (
                        <img
                            alt={src.split('/').pop()}
                            key={i}
                            src={src}
                            style={{width: 40, marginRight: 4}}
                        />
                    ))}
                </div>
            )
        }
    ];

    return (
        <div>
            <Table
                rowKey="id"
                size="middle"
                onRow={(record) => ({
                    onDoubleClick: () => {
                        onProductClick?.(record)
                    },
                })}
                columns={productColumns as ColumnsType<IProduct>}
                dataSource={products || []}
                pagination={false}
            />
        </div>
    );
};


export default ProductsTable;