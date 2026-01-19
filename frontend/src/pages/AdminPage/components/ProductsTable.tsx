import React from 'react';
import {Table} from 'antd';
import {useSelector} from 'react-redux';
import {IAppState, IProduct} from '../../../models';
import {ColumnsType} from 'antd/es/table';

interface IProps {
    products: IProduct[];
    onProductClick?: (product: IProduct) => void;
}

const ProductsTable = ({products, onProductClick}: IProps) => {


    const productColumns: ColumnsType<IProduct> = [
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
            width: 500,
        },
        {
            key: 'category',
            align: 'center',
            title: 'Категория товара',
            dataIndex: 'category'
        },
        {
            key: 'price',
            align: 'center',
            title: 'Цена товара',
            dataIndex: 'price'
        },
        {
            key: 'img',
            title: 'Изображение',
            dataIndex: 'img'
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
                columns={productColumns}
                dataSource={products || []}
                pagination={false}
            />
        </div>
    );
};


export default ProductsTable;