import React from 'react';
import styles from "./Compare.module.scss"
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const Compare = (props) => {
    return (
        <>
            <div className={clsx(styles.modal, !props.compareList ? clsx(styles.unactive) : "")}
                onClick={() => {
                    props.setCompareList(false)
                }}
            >

            </div>
            <div className={clsx(styles.modalBox, props.compareList ? clsx(styles.active)  : "")}>
                <div className={clsx(styles.modalBoxHeader)}>
                    <i class="fa-solid fa-xmark"
                        onClick={() => {props.setCompareList(false)}}
                    ></i>
                </div>
                <div className={`row g-0 ${clsx(styles.modalBoxBody)}`}>
                    <div className={`col-12 col-md-3 col-lg-3 ${clsx(styles.modalBoxTitle)}`}>
                        <div className={clsx(styles.containerTitle)}>
                            <p className={clsx(styles.modalBodyTitle)}>Compare Products</p>
                            <p className={clsx(styles.countProduct)}>(0 Products)</p>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 col-lg-6`}>
                        <div className={clsx(styles.listImage)}>
                            <NavLink className={clsx(styles.itemProduct)} to="/https://i.imgur.com/F8lruPR.jpg/https://i.imgur.com/vSMqjaz.jpg">
                                <img src="https://i.imgur.com/F8lruPR.jpg" alt="1" />
                                <span>
                                    <i class="fa-solid fa-xmark"></i>
                                </span>
                            </NavLink> 
                            <NavLink className={clsx(styles.itemProduct)} to="/">
                                <img src="https://i.imgur.com/F8lruPR.jpg" alt="2" />
                                <span>
                                    <i class="fa-solid fa-xmark"></i>
                                </span>
                            </NavLink> 
                            <div className={clsx(styles.haventProduct, clsx(styles.itemProduct))}>
                                <img src="https://i.imgur.com/vSMqjaz.jpg" alt="not ready yet"/>
                            </div>
                            <div className={clsx(styles.haventProduct, clsx(styles.itemProduct))}>
                                <img src="https://i.imgur.com/vSMqjaz.jpg" alt="not ready yet"/>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-3 col-lg-3 ${clsx(styles.modalBoxControl)}`}>
                        <button>Clear All</button>
                        <NavLink to="/" className={styles.btnLetCompare}>Let's Compare!</NavLink>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Compare;