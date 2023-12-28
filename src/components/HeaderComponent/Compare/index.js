import React, { useMemo } from 'react';
import styles from './Compare.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCompareList } from '../../../redux/slices/headerStateSlice';
import {
    removeItemToCompareList,
    clearAll,
    removeAllByUserID,
    removeOneToCompareListServer,
} from '../../../redux/slices/compareSlice';
import { Tooltip } from 'react-tooltip';
import configs from '../../../config';

const Compare = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();
    const compareList = useSelector((state) => state.headerStates.compareList);
    const compareStore = useSelector((state) => state.compare.compareList);
    const countItemCompareBlank = useMemo(() => {
        let count = 4;
        if (compareStore && compareStore.length > 0) {
            count = 4 - compareStore.length;
        }
        return count;
    }, [compareStore]);

    const handleClearAll = () => {
        if (userLogin.isLogin) {
            dispatch(removeAllByUserID(userLogin.user?._id));
            return;
        }
        dispatch(clearAll());
    }
    const handleDeleteOneItemComapre = (product)=>{
        if (userLogin.isLogin) {
            dispatch(removeOneToCompareListServer({
                userID: userLogin.user?._id,
                productObjectId: product._id,
                productID: product.productID
                
            }));
            return;
        }
        dispatch(removeItemToCompareList(product.productID));
    }

    return (
        <>
            <div
                className={clsx(
                    styles.modal,
                    !compareList ? clsx(styles.unactive) : '',
                )}
                onClick={() => {
                    dispatch(setCompareList(false));
                }}
            ></div>
            <div
                className={clsx(
                    styles.modalBox,
                    compareList ? clsx(styles.active) : '',
                )}
            >
                <div className={clsx(styles.modalBoxHeader)}>
                    <i
                        className="fa-solid fa-xmark"
                        onClick={() => {
                            dispatch(setCompareList(false));
                        }}
                    ></i>
                </div>
                <div className={`row g-0 ${clsx(styles.modalBoxBody)}`}>
                    <div
                        className={`col-12 col-md-3 col-lg-3 ${clsx(
                            styles.modalBoxTitle,
                        )}`}
                    >
                        <div className={clsx(styles.containerTitle)}>
                            <p className={clsx(styles.modalBodyTitle)}>
                                Compare Products
                            </p>
                            <p className={clsx(styles.countProduct)}>
                                ({compareStore ? compareStore.length : 0}{' '}
                                Products)
                            </p>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 col-lg-6`}>
                        <div className={clsx(styles.listImage)}>
                            {compareStore &&
                                compareStore.length > 0 &&
                                compareStore.map((product, index) => {
                                    return (
                                        <NavLink
                                            key={index}
                                            className={clsx(styles.itemProduct)}
                                            to={`/products/${product.productID}`}
                                            onClick={()=>{dispatch(setCompareList(false))}}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.boxImageZoom,
                                                )}
                                            >
                                                <img
                                                    src={
                                                        product.listProduct?.[0]
                                                            ?.type?.[0]
                                                            ?.imageSmall?.front
                                                    }
                                                    alt={product.productID}
                                                    data-tooltip-id={
                                                        product.productID
                                                    }
                                                    data-tooltip-content={
                                                        product.productName
                                                    }
                                                />
                                                <img
                                                    className={clsx(
                                                        styles.imageZoom,
                                                    )}
                                                    src={
                                                        product.listProduct?.[0]
                                                            ?.type?.[0]
                                                            ?.imageToShow.front
                                                    }
                                                    alt={'zoom'}
                                                />
                                                <Tooltip
                                                    id={product.productID}
                                                    place="bottom"
                                                />
                                            </div>

                                            <span>
                                                <i
                                                    className="fa-solid fa-xmark"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        handleDeleteOneItemComapre(product)
                                                    }}
                                                ></i>
                                            </span>
                                        </NavLink>
                                    );
                                })}
                            {countItemCompareBlank > 0 &&
                                Array(countItemCompareBlank)
                                    .fill(0)
                                    .map((value, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={clsx(
                                                    styles.haventProduct,
                                                    clsx(styles.itemProduct),
                                                )}
                                            >
                                                <img
                                                    src="https://i.imgur.com/vSMqjaz.jpg"
                                                    alt="not ready yet"
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-3 col-lg-3 ${clsx(
                            styles.modalBoxControl,
                        )}`}
                    >
                        {
                            !compareStore || compareStore.length == 0 
                            ? 
                            <>
                                
                            </>
                            : 
                            <>
                                <button onClick={() => handleClearAll()}>
                                    Clear All
                                </button>
                                <NavLink to={configs.routes.compare} className={styles.btnLetCompare}
                                    onClick={()=> dispatch(setCompareList(false))}
                                >
                                    Let's Compare!
                                </NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Compare;
