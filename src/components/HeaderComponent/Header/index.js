import React, { useCallback, useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Wishlist from '../Wishlist';
import Cart from "../Cart"

const Header = () => {
    const [wistList, setWistlist] = useState(false);
    const [cartList, setCartList] = useState(false);

    const toggleWishlist = useCallback((e) => {
        e.stopPropagation()
        setWistlist(prevState => !prevState)
    }, [wistList])

    const toggleCartList = useCallback((e) => {
        e.stopPropagation()
        setCartList(prevState => !prevState)
    })
    return (
        <header>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.headerOneParent)}>
                    <div className={clsx(styles.headerOne)}>
                        <div className={clsx(styles.headerOneLeft)}>
                            <span>
                                <i class="fa-solid fa-computer"></i>
                                Add anything here or just remove it...
                            </span>
                        </div>
                        <div className={clsx(styles.headerOneRight)}>
                            <div className={clsx(styles.headerOneRightItem)}>
                                <p>English</p>
                                <ul>
                                    <li>Deutsch</li>
                                    <li>Français</li>
                                    <li>Requires WPML</li>
                                </ul>
                            </div>
                            <div className={clsx(styles.headerOneRightItem)}>
                                <p>US Dollar</p>
                                <ul>
                                    <li>Euro (EUR)</li>
                                    <li>Indian Rupee (INR)</li>
                                    <li>Pound (GBP)</li>
                                </ul>
                            </div>
                            <div
                                className={clsx(
                                    styles.headerOneRightItem,
                                    styles.account,
                                )}
                            >
                                <span>
                                    <i class="fa-regular fa-circle-user"></i>
                                    Login / Registry
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.headerTwo)}>
                    <div className={clsx(styles.boxLogoImage)}>
                        <img src="https://i.imgur.com/Hc92VcL.png" alt="logo" />

                        <div className={clsx(styles.mobile, styles.menu)}>
                            <i class="fa-solid fa-bars"></i>
                        </div>

                        <div className={clsx(styles.mobile, styles.search)}>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className={clsx(styles.boxNavigation)}>
                        <ul>
                            <li className={clsx(styles.navigaItem)}>
                                <NavLink
                                    to="/"
                                    className={clsx(styles.navlink)}
                                >
                                    HOME
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navigaItem)}>
                                <NavLink
                                    to="/"
                                    className={clsx(styles.navlink)}
                                >
                                    PAGES
                                    <i class="fa-solid fa-angle-down"></i>
                                </NavLink>
                                <ul>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            My Account
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Contact Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            About Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Order Tracking
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            FAQ
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Site Boxed
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Popup Newsletter
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Top Promotion
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Cookies Law - GDPR
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            Maintenance Mode
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={clsx(styles.navlink)}
                                        >
                                            404
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className={clsx(styles.navigaItem)}>
                                <NavLink
                                    to="/"
                                    className={clsx(styles.navlink)}
                                >
                                    VENDORS
                                </NavLink>
                            </li>
                        </ul>
                        <div className={clsx(styles.boxLogoImageCenter)}>
                            <img
                                src="https://i.imgur.com/Hc92VcL.png"
                                alt="logo"
                            />
                        </div>
                    </div>

                    <div className={clsx(styles.userController)}>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerMobile,
                            )}
                        >
                            <i class="fa-regular fa-circle-user"></i>
                        </div>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerCard,
                            )}
                            onClick={toggleCartList}
                        >
                            <i class="fa-solid fa-bag-shopping"></i>
                            <span>0</span>
                        </div>
                        <Cart
                            cartList={cartList}
                            setCartList={setCartList}
                        ></Cart>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerWishlist,
                            )}
                            onClick={toggleWishlist}
                        >
                            <i class="fa-regular fa-heart"></i>
                            <span>4</span>
                            
                        </div>
                        <Wishlist wistList={wistList} setWistlist={setWistlist}></Wishlist>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerCompare,
                            )}
                        >
                            <i class="fa-solid fa-rotate-left"></i>
                            <span>4</span>
                        </div>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerSearcb,
                            )}
                        >
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
