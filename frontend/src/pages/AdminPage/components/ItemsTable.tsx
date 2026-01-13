import React from 'react';
import {Table} from 'antd';
import {useSelector} from 'react-redux';
import {IAppState, ItemType} from '../../../models';
import {ColumnsType} from 'antd/es/table';

interface IProps {
    onItemClick?: (item: ItemType) => void;
}

const ItemsTable = ({onItemClick}: IProps) => {
    const items = useSelector((state: IAppState) => state.itemsData.items);

    const itemColumns: ColumnsType<ItemType> = [
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
                        onItemClick?.(record)},
                })}
                columns={itemColumns}
                dataSource={items || []}
                pagination={false}
            />
        </div>
    );
};


export default ItemsTable;