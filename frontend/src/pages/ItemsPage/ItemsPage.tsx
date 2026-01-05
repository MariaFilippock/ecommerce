import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import itemsData from '../../data/data.json';
import {IAppState, ItemType} from '../../models';
import {setItemsAC} from '../../store/items-reducer';
import Item from '../../components/Item/Item';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';


const ItemsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state: IAppState) => state.itemsData.items);

    useEffect(() => {
        dispatch(setItemsAC(itemsData.items));
    }, []);

    const handleItemDetailCardClick = (id: number) => {
        navigate(`${ROUTES.ITEM}/${id}`);
    }

    return (
        <main>
            {items.map((el: ItemType) => (
                <Item onCardClick={handleItemDetailCardClick} key={el.id} item={el}/>
            ))}
        </main>
    );
}

export default ItemsPage;
