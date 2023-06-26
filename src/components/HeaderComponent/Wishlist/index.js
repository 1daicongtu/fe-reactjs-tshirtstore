import React from 'react';
import clsx from 'clsx';
import styles from "./Wishlist.module.scss"
import { NavLink, Link } from 'react-router-dom';

const Wishlist = (props) => {
    return (
        <>
                <div className={`${clsx(styles.modal, !props.wistList ? styles.unactive : "")}`}
                    onClick={()=> props.setWistlist(false)}
                >     
                </div>

                <div className={clsx(styles.modalBox, props.wistList ? styles.active : "")}>
                    <div className={clsx(styles.modalHeader)}>
                        <h1>Wishlist</h1>
                        <span className={clsx(styles.btnCloseModal)}
                            onClick={() => props.setWistlist(false)}
                        >
                            <i class="fa-solid fa-angle-right"></i>
                        </span>
                    </div>

                    <div className={clsx(styles.modalBody)}>
                        <div className={clsx(styles.wishlistItem)}>
                            <div className={clsx(styles.wishlistItemLeft)}>
                                <div className={clsx(styles.wishItemImage)}>
                                    <Link to="/">
                                        <img src="https://i.imgur.com/6JddsDH.jpg" alt="3" />
                                    </Link>
                                </div>
                                <div className={clsx(styles.wishItemContent)}>
                                    <NavLink to="/" className={clsx(styles.navlink, styles.productName)}>
                                        Palestine
                                    </NavLink>
                                    <p className={clsx(styles.itemProductPrice)}>$36.00-$56.00</p>
                                    <NavLink to="/" className={clsx(styles.navlink, styles.selectOption)}>
                                        SELECT OPTIONS
                                    </NavLink>
                                </div>
                            </div>
                            <div className={clsx(styles.wishListRemoveItem)}>
                                <span>
                                    <i class="fa-solid fa-xmark"></i>
                                </span>
                            </div>
                        </div>   
                    </div>
                </div>
        </>
    );
};

export default Wishlist;