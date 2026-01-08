import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {IAppState, ItemType} from '../../models';
import Item from '../../components/Item/Item';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {setFavoritesThunk} from '../../store/favorites-thunk';


const FavoritesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selectFavoritesItems = (state: IAppState) =>
        state.itemsData.favorites
            .map((favId) =>
                state.itemsData.items.find((item) => item.id === favId)
            ).filter((item): item is ItemType => item !== undefined);

    const favoritesList = useSelector(selectFavoritesItems);

    useEffect(() => {
        dispatch(setFavoritesThunk());
    }, [dispatch]);

    const handleItemDetailCardClick = (id: number) => {
        navigate(`${ROUTES.ITEMS}/${id}`);
    };

    return (
        <main>
            {favoritesList.length > 0 ? (
                favoritesList.map((favItem) => (
                    <Item key={favItem.id} item={favItem} onCardClick={handleItemDetailCardClick}/>
                ))
            ) : (
                <div>Пусто</div>
            )}
        </main>
    );
};

export default FavoritesPage;