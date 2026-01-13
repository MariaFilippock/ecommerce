import React from 'react';
import {Table} from 'antd';
import {useSelector} from 'react-redux';
import {IAppState, IProductType} from '../../../models';
import {ColumnsType} from 'antd/es/table';

interface IProps {
    onProductClick?: (product: IProductType) => void;
}

const ProductsTable = ({onProductClick}: IProps) => {
    const products = useSelector((state: IAppState) => state.productsData.products);

    const productColumns: ColumnsType<IProductType> = [
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
    ];

    return (
        <div>
            <Table
                rowKey="id"
                size="middle"
                onRow={(record) => ({
                    onDoubleClick: () =>  {
                        onProductClick?.(record)},
                })}
                columns={productColumns}
                dataSource={products || []}
                pagination={false}
            />
        </div>
    );
};


export default ProductsTable;