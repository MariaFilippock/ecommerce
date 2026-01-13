import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IAppState} from '../../models';
import Utils from '../../CartUtils';
import styles from './styles.module.scss';


const Header = () => {
    const cart = useSelector((state: IAppState) => state.productsData.cart ?? []);
    const setIsActive = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';

    return (
        <header>
            <div>
                <span className={styles.logo}>House Staff</span>
                <ul className={styles.nav}>
                    <NavLink className={setIsActive} to='/products'>Товары</NavLink>
                    <NavLink className={setIsActive} to='/about'>Про нас</NavLink>
                    <NavLink className={setIsActive} to='/admin'>Администрирование</NavLink>
                    <NavLink className={setIsActive} to='/profile'>Кабинет</NavLink>
                    <NavLink className={setIsActive} to='/favorites'>Избранное</NavLink>
                    <NavLink className={setIsActive} to='/cart'>
                        Корзина {cart.length > 0 ? `(${Utils.cartProductsQuantity(cart)})` : null}
                    </NavLink>
                </ul>
            </div>
        </header>
    );
}

export default Header;