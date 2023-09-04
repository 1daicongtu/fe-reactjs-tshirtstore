import { useCallback, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import Wishlist from '../Wishlist';
import Cart from '../Cart';
import Compare from '../Compare';
import Search from '../Search';
import Login from '../Login';
import MobileNavbar from '../MobileNavbar';
import { useSelector, useDispatch } from 'react-redux';
import {
    setWistList,
    setCartList,
    setSearch,
    setCompareList,
    setLogin,
    setMobileNavbar,
} from '../../../redux/slices/headerStateSlice';
import PopupProductQuickView from '../../PopupProductQuickView';
import Register from '../Register';
import { logout } from '../../../redux/slices/userLogin';

const Header = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.headerStates.wistList);
    const cartList = useSelector((state) => state.headerStates.cartList);
    const search = useSelector((state) => state.headerStates.search);
    const compareList = useSelector((state) => state.headerStates.compareList);
    const login = useSelector(
        (state) => state.headerStates.login,
    );
    const mobileNavbar = useSelector(
        (state) => state.headerStates.mobileNavbar,
    );

    const [stateScollDown, setStateScollDown] = useState(false);
    const compareStore = useSelector((state) => state.compare.compareList);
    const wistListStore = useSelector((state) => state.wishlist.wishLists);
    const cartStore = useSelector((state)=> state.cart.cart)
    const loginUserInfo = useSelector((state) => state.userLogin.user);

    useEffect(() => {
        function handleScrollY() {
            if (window.scrollY > 100) {
                setStateScollDown(true);
            } else {
                setStateScollDown(false);
            }
        }
        window.addEventListener('scroll', handleScrollY);
        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    const toggleMobileNavbar = useCallback((e) => {
        e.stopPropagation();
        dispatch(setMobileNavbar(!mobileNavbar));
    }, []);

    const toggleWishlist = useCallback((e) => {
        e.stopPropagation();
        dispatch(setWistList(!wishlist));
    }, []);

    const toggleCartList = useCallback((e) => {
        e.stopPropagation();
        dispatch(setCartList(!cartList));
    }, []);
    const toggleCompareList = useCallback((e) => {
        e.stopPropagation();
        dispatch(setCompareList(!compareList));
    }, []);

    const toggleSearch = useCallback((e) => {
        e.stopPropagation();
        dispatch(setSearch(!search));
    }, []);
    const toggleOpenLoginRegistry = useCallback((e) => {
        e.stopPropagation();
        dispatch(setLogin(!login));
    }, []);

    return (
        <header>
            <div
                className={clsx(
                    styles.container,
                    stateScollDown ? styles.scollDown : '',
                )}
            >
                <div style={{ width: '100%', height: '1px' }}></div>
                <div className={clsx(styles.headerOneParent)}>
                    <div className={clsx(styles.headerOne)}>
                        <div className={clsx(styles.headerOneLeft)}>
                            <span>
                                <i className="fa-solid fa-computer"></i>
                                Add anything here or just remove it...
                            </span>
                        </div>
                        <div className={clsx(styles.headerOneRight)}>
                            {/* <div className={clsx(styles.headerOneRightItem)}>
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
                            </div> */}
                            {
                                loginUserInfo 
                                ?
                            
                                <div
                                    className={clsx(
                                        styles.headerOneRightItem,
                                        styles.dropdownUser,
                                        styles.account
                                    )}
                                >
                                    <span>
                                            <i class="fa-regular fa-address-card"></i>
                                            Hello {loginUserInfo.firstName}!
                                    </span>
                                    <ul>
                                        <li>
                                            <Link to={"/my-account"}>Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to={"/my-account"}>Order</Link>
                                        </li>
                                        <li>
                                            <Link to={"/my-account"}>Address</Link>
                                        </li>
                                        <li>
                                            <Link to={"/my-account"}>Account Details</Link>
                                        </li>
                                        <li className={clsx(styles.logoutBox)}
                                            onClick={()=>{dispatch(logout())}}
                                        >    
                                            <span >
                                                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                                Log out
                                            </span>
                                            
                                        </li>
                                    </ul>
                                </div>
                                : 
                                <div
                                    className={clsx(
                                        styles.headerOneRightItem,
                                        styles.account,
                                    )}
                                    onClick={toggleOpenLoginRegistry}
                                >
                                    <span>
                                        <i className="fa-regular fa-circle-user"></i>
                                        Login / Registry
                                    </span>
                                </div>
                            }
                            

                        </div>
                        <Login />
                        <Register/>
                    </div>
                </div>
                <div className={clsx(styles.headerTwo)}>
                    <div className={clsx(styles.boxLogoImage)}>
                        <Link to="/">
                            <img
                                src="https://i.imgur.com/Hc92VcL.png"
                                alt="logo"
                            />
                        </Link>

                        <div
                            className={clsx(styles.mobile, styles.menu)}
                            onClick={toggleMobileNavbar}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </div>
                        <MobileNavbar />
                        <div
                            className={clsx(styles.mobile, styles.search)}
                            onClick={toggleSearch}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
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
                                    <i className="fa-solid fa-angle-down"></i>
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
                            <i
                                className="fa-regular fa-circle-user"
                                onClick={toggleOpenLoginRegistry}
                            ></i>
                        </div>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerCard,
                            )}
                            onClick={toggleCartList}
                        >
                            <i className="fa-solid fa-bag-shopping"></i>
                            {
                                cartStore && cartStore.length > 0 ? (
                                    <span>{cartStore.length}</span>
                                )
                                : 
                                ""
                            }
                        </div>
                        <Cart></Cart>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerWishlist,
                            )}
                            onClick={toggleWishlist}
                        >
                            <i className="fa-regular fa-heart"></i>
                            {wistListStore && wistListStore.length > 0 ? (
                                <span>{wistListStore.length}</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <Wishlist></Wishlist>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerCompare,
                            )}
                            onClick={toggleCompareList}
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                            {compareStore && compareStore.length > 0 ? (
                                <span>{compareStore.length}</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <Compare></Compare>
                        <div
                            className={clsx(
                                styles.userControllerItem,
                                styles.userControllerSearcb,
                            )}
                            onClick={toggleSearch}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <Search></Search>
                    </div>
                </div>
                <div className={clsx(styles.navigationMobileBox)}>
                    <div className={clsx(styles.navigationMobile)}>
                        <NavLink to="/" className={clsx(styles.itemNavigation)}>
                            <i className="fa-solid fa-house"></i>
                            <span>Shop</span>
                        </NavLink>

                        <div
                            className={clsx(styles.itemNavigation)}
                            onClick={toggleSearch}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span>Search</span>
                        </div>

                        <div
                            className={clsx(styles.itemNavigation)}
                            onClick={toggleWishlist}
                        >
                            <i className="fa-regular fa-heart"></i>
                            <span>Wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
            <PopupProductQuickView />
        </header>
    );
};

export default Header;
