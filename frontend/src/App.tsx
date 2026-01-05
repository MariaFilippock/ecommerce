import React, {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';
import Footer from './pages/Footer';
import Header from './components/Header/Header';

const ItemsPage = lazy(() => import('./pages/ItemsPage/ItemsPage'));
const About = lazy(() => import('./pages/AboutPage/AboutPage'));
const Profile = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const ItemDetailCardPage = lazy(() => import('./pages/ItemDetailCardPage/ItemDetailCardPage'));

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/items' element={<ItemsPage/>}/>
                <Route path='/favorites' element={<FavoritesPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/item/:id' element={<ItemDetailCardPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
