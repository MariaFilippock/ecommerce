import React, {useEffect, useState} from 'react';
import {Button, Tabs, TabsProps} from 'antd';
import {EAdministrationTab, Text} from '../../const';
import ProductsTable from './components/ProductsTable';
import AddProductForm from './components/AddProductForm';
import {IAppState, IProduct} from '../../models';
import EditProductForm from './components/EditProductForm';
import {useSelector} from 'react-redux';
import {loadProductsThunk} from '../../store/product-thunk';
import {useAppDispatch} from '../../store/hooks';

const ADD_TAB_KEY = 'ADD_TAB_KEY';
export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const [activeKey, setActiveKey] = useState<string>(EAdministrationTab.PRODUCTS_TABLE);
    const [tabs, setTabs] = useState<NonNullable<TabsProps['items']>>([]);
    const products = useSelector((state: IAppState) => state.productsData.products);

    /**
     Загрузка списка товаров
     */
    useEffect(() => {
        dispatch(loadProductsThunk());
    }, [dispatch])

    /**
     * Обработчик клика на "добавить новый товар" открытия новый таба
     */
    const addNewProduct = () => {
        const exists = tabs?.some(tab => tab.key === ADD_TAB_KEY);

        if (exists) {
            return setActiveKey(ADD_TAB_KEY);
        }

        setTabs(state => [
            ...state,
            {
                label: Text.Administration.addition,
                key: ADD_TAB_KEY,
                children: (<AddProductForm onSuccessAdd={() => remove(ADD_TAB_KEY)}/>),
                closable: true,
            },
        ]);

        setActiveKey(ADD_TAB_KEY);
    };

    /**
     * Обработчик нажатия на строку таблицы.
     */
    const editProductTab = (product: IProduct) => {
        const tabKey = `edit-${product.id}`;

        const exists = tabs?.some(tab => tab.key === tabKey);

        if (exists) {
            return setActiveKey(tabKey);
        }

        setTabs(state => [
            ...state,
            {
                label: `${product.title} (редактирование)`,
                key: tabKey,
                closable: true,
                children: (<EditProductForm onSuccessDelete={() => remove(tabKey)} product={product}/>)
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
        const newProducts = tabs.filter((tab) => tab.key !== targetKey);

        if (newProducts.length && targetKey === activeKey) {
            const newActiveKey =
                newProducts[targetIndex === newProducts.length ? targetIndex - 1 : targetIndex].key;
            setActiveKey(newActiveKey);
        }

        setTabs(newProducts);
        setActiveKey(EAdministrationTab.PRODUCTS_TABLE);
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
                key: EAdministrationTab.PRODUCTS_TABLE,
                label: Text.Administration.productsTable,
                children: (
                    <>
                        <Button type='primary' onClick={addNewProduct} style={{marginBottom: '20px'}}>
                            Добавить новый товар
                        </Button>

                        <ProductsTable products={products} onProductClick={editProductTab}/>
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