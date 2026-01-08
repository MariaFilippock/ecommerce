import React, {useEffect} from 'react';
import {IAppState, ItemType} from '../../models';
import Item from '../../components/Item/Item';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {setItemsThunk} from '../../store/item-thunk';
import {useAppDispatch} from '../../store/hooks';
import {useSelector} from 'react-redux';


const ItemsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useSelector((state: IAppState) => state.itemsData.items);

    useEffect(() => {
        dispatch(setItemsThunk());
    }, [dispatch]);

    const handleItemDetailCardClick = (id: number) => {
        navigate(`${ROUTES.ITEMS}/${id}`);
    }

    return (
        <main>
            {items.map((el: ItemType) => (
                <Item onCardClick={handleItemDetailCardClick} key={el.id} item={el}/>
            ))}
        </main>
    );
};

export default ItemsPage;
