import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IAppState} from '../../models';
import Utils from '../../CartUtils';
import styles from './styles.module.scss';
import {MenuOutlined} from '@ant-design/icons';


const Header = () => {
    const cart = useSelector((state: IAppState) => state.productsData.cart ?? []);
    const setIsActive = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {to: '/products', label: 'Товары'},
        {to: '/about', label: 'Про нас'},
        {to: '/admin', label: 'Администрирование'},
        {to: '/favorites', label: 'Избранное'},
        {to: '/cart', label: 'Корзина', isCart: true},
    ];

    const renderLinks = (onClick?: () => void) =>
        navLinks.map(({label, to, isCart}) => (
            <NavLink className={setIsActive} to={to} key={to} onClick={onClick}>
                {label}
                {isCart && cart.length > 0 ? ` (${Utils.cartProductsQuantity(cart)})` : null}
            </NavLink>
        ));

    return (
        <header>
            <NavLink className={styles.logo} to='/'>House Staff</NavLink>
            <div className={styles.nav}>
                {renderLinks()}
            </div>
            <div className={styles.burger}>
                <MenuOutlined onClick={() => setIsOpen(!isOpen)}/>
                {isOpen
                    ? <div className={styles.openBurgerNav}>
                        {renderLinks(() => setIsOpen(false))}
                    </div>
                    : null
                }
            </div>
        </header>
    );
}

export default Header;