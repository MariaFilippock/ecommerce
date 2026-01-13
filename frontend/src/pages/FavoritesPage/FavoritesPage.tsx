import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {IAppState, IProductType} from '../../models';
import Product from '../../components/Product/Product';
import {ROUTES} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks';
import {setFavoritesThunk} from '../../store/favorites-thunk';


const FavoritesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selectFavoritesProducts = (state: IAppState) =>
        state.productsData.favorites
            .map((favId) =>
                state.productsData.products.find((product) => product.id === favId)
            ).filter((product): product is IProductType => product !== undefined);

    const favoritesList = useSelector(selectFavoritesProducts);

    useEffect(() => {
        dispatch(setFavoritesThunk());
    }, [dispatch]);

    const handleDetailProductCardClick = (id: number) => {
        navigate(`${ROUTES.PRODUCTS}/${id}`);
    };

    return (
        <main>
            {favoritesList.length > 0 ? (
                favoritesList.map((favProduct) => (
                    <Product key={favProduct.id} product={favProduct} onCardClick={handleDetailProductCardClick}/>
                ))
            ) : (
                <div>Пусто</div>
            )}
        </main>
    );
};

export default FavoritesPage;