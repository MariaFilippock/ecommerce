import React, {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';
import Footer from './pages/Footer';
import Header from './components/Header/Header';

const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const About = lazy(() => import('./pages/AboutPage/AboutPage'));
const Profile = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const DetailProductCardPage = lazy(() => import('./pages/DetailProductCardPage/DetailProductCardPage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/favorites' element={<FavoritesPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/products/:id' element={<DetailProductCardPage/>}/>
                <Route path='/admin' element={<AdminPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
