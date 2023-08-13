import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MobileNavbar.module.scss';
import { NavLink } from 'react-router-dom';
import {
    setMobileNavbar,
    setLogin,
} from '../../../redux/slices/headerStateSlice';
import { useSelector, useDispatch } from 'react-redux';

const MobileNavbar = () => {
    const dispatch = useDispatch();
    const mobileNavbar = useSelector(
        (state) => state.headerStates.mobileNavbar,
    );

    const [statePageMore, setStatePageMore] = useState(false);
    const [stateMoreLanguege, setStateMoreLanguege] = useState(false);
    const [stateMoreTypeOfMoney, setStateMoreTypeOfMoney] = useState(false);

    const handleOpenLoginModal = () => {
        dispatch(setMobileNavbar(false));
        dispatch(setLogin(true));
    };

    return (
        <>
            <div
                className={clsx(
                    styles.modal,
                    !mobileNavbar ? styles.unactive : '',
                )}
                onClick={() => dispatch(setMobileNavbar(false))}
            ></div>
            <div
                className={clsx(
                    styles.modalBox,
                    mobileNavbar ? styles.active : '',
                )}
            >
                <div className={clsx(styles.modalHeader)}>
                    <img src="https://i.imgur.com/Hc92VcL.png" alt="logo" />
                    <span
                        className={clsx(styles.btnCloseModal)}
                        onClick={() => dispatch(setMobileNavbar(false))}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </span>
                </div>

                <div className={clsx(styles.modalBody)}>
                    <div className={clsx(styles.bodyNavigation)}>
                        <ul className={clsx(styles.itemNavigation)}>
                            <li>HOME</li>
                            <li>
                                <div className={clsx(styles.pagesTitle)}>
                                    <span>PAGES</span>
                                    <span
                                        className={clsx(
                                            styles.pageSeeMore,
                                            !statePageMore
                                                ? styles.unactive
                                                : '',
                                        )}
                                        onClick={() =>
                                            setStatePageMore(!statePageMore)
                                        }
                                    ></span>
                                </div>
                                <ul
                                    className={clsx(
                                        statePageMore ? styles.active : '',
                                    )}
                                >
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            My Account
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Contact Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            About Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Order Tracking
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            FAQ
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Site Boxed
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Popup Newsletter
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Top Promotion
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Cookies Law - GDPR
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            Maintenance Modal
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={styles.linkItemPages}
                                        >
                                            404
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>VENDOR</li>
                        </ul>
                    </div>
                    <div className={clsx(styles.loginAndLanguague)}>
                        <div className={clsx(styles.loginBox)}>
                            <button onClick={handleOpenLoginModal}>
                                <i className="fa-regular fa-circle-user"></i>
                                <span>Login / Registry</span>
                            </button>
                        </div>
                        <div className={clsx(styles.languageAndTypeOfMoney)}>
                            <div className={clsx(styles.languageBox)}>
                                <button
                                    onClick={() =>
                                        setStateMoreLanguege(!stateMoreLanguege)
                                    }
                                >
                                    English
                                    {stateMoreLanguege ? (
                                        <span>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fa-solid fa-angle-up"></i>
                                        </span>
                                    )}
                                </button>
                                <ul
                                    className={
                                        stateMoreLanguege ? styles.active : ''
                                    }
                                >
                                    <li>Deutsch</li>
                                    <li>Francais</li>
                                    <li>Requires WPML</li>
                                </ul>
                            </div>
                            <div className={clsx(styles.typeOfMoney)}>
                                <button
                                    onClick={() =>
                                        setStateMoreTypeOfMoney(
                                            !stateMoreTypeOfMoney,
                                        )
                                    }
                                >
                                    US Dollar
                                    {stateMoreTypeOfMoney ? (
                                        <span>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fa-solid fa-angle-up"></i>
                                        </span>
                                    )}
                                </button>
                                <ul
                                    className={
                                        stateMoreTypeOfMoney
                                            ? styles.active
                                            : ''
                                    }
                                >
                                    <li>Euro (EUR)</li>
                                    <li>Indian Rupee (INR)</li>
                                    <li>Pound (GBP)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNavbar;
