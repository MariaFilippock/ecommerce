import React, {useState} from 'react';
import {Button, Tabs, TabsProps} from 'antd';
import {EAdministrationTab, Text} from '../../const';
import ItemsTable from './components/ItemsTable';
import AddItemForm from './components/AddItemForm';
import {ItemType} from '../../models';
import EditItemForm from './components/EditItemForm';

const ADD_TAB_KEY = 'ADD_TAB_KEY';
export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const AdminPage = () => {
    const [activeKey, setActiveKey] = useState<string>(EAdministrationTab.ITEMS_TABLE);
    const [tabs, setTabs] = useState<NonNullable<TabsProps['items']>>([]);

    /**
     * Обработчик клика на "добавить новый товар" открытия новый таба
     */

    const addNewItem = () => {
        const exists = tabs.some(tab => tab.key === ADD_TAB_KEY);

        if (exists) {
            return setActiveKey(ADD_TAB_KEY);
        }

        setTabs(state => [
            ...state,
            {
                label: Text.Administration.addition,
                key: ADD_TAB_KEY,
                children: (<AddItemForm onSuccessAdd={() => remove(ADD_TAB_KEY)} />),
                closable: true,
            },
        ]);

        setActiveKey(ADD_TAB_KEY);
    };

    /**
     * Обработчик нажатия на строку таблицы.
     */
    const editItemTab = (item: ItemType) => {
        const tabKey = `edit-${item.id}`;

        const exists = tabs.some(tab => tab.key === tabKey);

        if (exists) {
            return setActiveKey(tabKey);
        }

        setTabs(state => [
            ...state,
            {
                label: `${item.title} (редактирование)`,
                key: tabKey,
                closable: true,
                children: (<EditItemForm onSuccessDelete={() => remove(tabKey)} item={item}/>)
            }
        ]);

        setActiveKey(tabKey);
    };

    /**
     * Закрытие таба
     */
    const remove = (targetKey: TargetKey) => {
        if (!tabs) {
            return;
        }
        const targetIndex = tabs.findIndex((tab) => tab.key === targetKey);
        const newItems = tabs.filter((tab) => tab.key !== targetKey);

        if (newItems.length && targetKey === activeKey) {
            const newActiveKey =
                newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].key;
            setActiveKey(newActiveKey);
        }

        setTabs(newItems);
        setActiveKey(EAdministrationTab.ITEMS_TABLE);
    };

    /**
     * Переключение между табами
     */
    const onChange = (key: string) => {
        setActiveKey(key);
    };

    return (
        <Tabs
            type="editable-card"
            activeKey={activeKey}
            items={[{
                key: EAdministrationTab.ITEMS_TABLE,
                label: Text.Administration.itemsTable,
                children: (
                    <>
                        <Button type='primary' onClick={addNewItem} style={{marginBottom: '20px'}}>
                            Добавить новый товар
                        </Button>

                        <ItemsTable onItemClick={editItemTab}/>
                    </>
                ),
            }, ...tabs]}
            onChange={onChange}
            onEdit={(targetKey: TargetKey) => remove(targetKey)}
            hideAdd
        />
    );
};

export default AdminPage;