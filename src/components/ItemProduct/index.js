import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addOneWishlistToServer, deleteItemInWistListByProductID, removeItemById } from '../../redux/slices/wishlistSlice';
import { addItemToCompareList } from '../../redux/slices/compareSlice';
import clsx from 'clsx';
import styles from './ItemProduct.module.scss';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import getColor from '../../utils/getColor';
import { setCompareList } from '../../redux/slices/headerStateSlice';
import {
    setShowPopup,
    setProductToShow,
} from '../../redux/slices/popupQuickViewProduct';

const ItemProduct = ({ product }) => {
    const userLogin = useSelector((state) => state.userLogin);  
    const dispatch = useDispatch();
    const listWishList = useSelector((state) => state.wishlist.wishLists)?.map(
        (product) => {
            return product.productID;
        },
    );
    const listCompare = useSelector((state) => state.compare.compareList)?.map(
        (product) => {
            return product.productID;
        },
    );
    const [wishListTick, setWishListTick] = useState(
        
        listWishList && listWishList.includes(product.productID) ? true : false,
    );

    const [productDetailActive, setProductDetailActive] = useState(() => {
        return product.listProduct?.length > 0 ? product.listProduct[0] : null;
    });
    const [sizeSelected, setSizeSelected] = useState(() => {
        return product && product.size.length > 0 ? product.size[0] : null;
    });

    const toggleAddRemoveProductToWishList = (product) => {
        if (wishListTick) {
            if (userLogin.isLogin){
                dispatch(deleteItemInWistListByProductID({userID : userLogin.user?._id,  productID: product.productID, productObjectId: product._id}));
            } else {
                dispatch(removeItemById(product.productID));
            }
            setWishListTick(false);
        } else {
            if (userLogin.isLogin){
                // add one to server
                dispatch(addOneWishlistToServer(
                    {userID: userLogin.user?._id, product}
                ))
            }  else {
                dispatch(addItem(product));
            }
            setWishListTick(true);
        }
    };

    const handleClickIntoColor = (color) => {
        const productDetail = product.listProduct.find((productDetail) => {
            return productDetail.color === color;
        });
        setProductDetailActive(productDetail);
    };

    const showQuickViewPopup = (product) => {
        dispatch(setProductToShow(product));
        dispatch(setShowPopup(true));
    };

    return (
        <div className={`${clsx(styles.productItem)}`}>
            <div className={` ${clsx(styles.productItemDetail)}`}>
                <div className={` ${clsx(styles.productImageBox)}`}>
                    <Link
                        to={`/products/${product.productID}`}
                        className={clsx(styles.productImageBoxOverlay)}
                    >
                        <img
                            src={
                                productDetailActive?.type?.[0]?.imageToShow
                                    ?.front
                            }
                            alt="anh1"
                            className={clsx(styles.frontImage)}
                        />
                        <img
                            src={
                                productDetailActive?.type?.[0]?.imageToShow
                                    ?.back
                            }
                            alt="anh2"
                            className={clsx(styles.backImage)}
                        />
                    </Link>

                    {product.isSale ? (
                        <span className={clsx(styles.saleTitle)}>SALE</span>
                    ) : (
                        ''
                    )}
                    <div className={clsx(styles.productAction)}>
                        <button
                            className={clsx(styles.btnActionProduct)}
                            data-tooltip-id={`id-btn-selectOption-${product.productID}}`}
                            data-tooltip-content="Select options"
                            onClick={() => {
                                showQuickViewPopup(product);
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <Tooltip
                            id={`id-btn-selectOption-${product.productID}}`}
                        />
                        <button
                            className={clsx(
                                styles.btnActionProduct,
                                styles.btnWishlist,
                            )}
                            data-tooltip-id={`id-btn-addToWishlist-${product.productID}`}
                            data-tooltip-content="Add to Wishlist"
                            onClick={() => {
                                toggleAddRemoveProductToWishList(product);
                            }}
                        >
                            {listWishList && listWishList.length > 0 && listWishList.includes(product.productID) ? (
                                <i
                                    className={`fa-solid fa-heart  ${styles.active}`}
                                ></i>
                            ) : (
                                <i className="fa-regular fa-heart"></i>
                            )}
                        </button>
                        <Tooltip
                            id={`id-btn-addToWishlist-${product.productID}`}
                        />
                        <button
                            className={clsx(styles.btnActionProduct)}
                            data-tooltip-id={`id-btn-Quickview-${product.productID}`}
                            data-tooltip-content="Quickview"
                            onClick={() => {
                                showQuickViewPopup(product);
                            }}
                        >
                            <i className="fa-regular fa-eye"></i>
                        </button>
                        <Tooltip id={`id-btn-Quickview-${product.productID}`} />

                        <button
                                    className={clsx(
                                        styles.btnActionProduct,
                                        styles.btnActionCompare,
                                    )}
                                    data-tooltip-id={`id-btn-Compare-${product.productID}`}
                                    data-tooltip-content="Compare"
                                    onClick={() => {
                                        dispatch(addItemToCompareList(product));
                                        dispatch(setCompareList(true));
                                    }}
                                >
                                    {listCompare && listCompare.includes(product.productID) ? (
                                        <i
                                            className={`fa-solid fa-check ${styles.active}`}
                                        ></i>
                                    ) : (
                                        <i className="fa-solid fa-rotate"></i>
                                    )}
                                </button>
                        <Tooltip id={`id-btn-Compare-${product.productID}`} />
                    </div>
                </div>
                <div className={`${clsx(styles.productInfoDetail)}`}>
                    <p className={clsx(styles.productCategory)}>
                        {product.category.join(', ')}
                    </p>
                    <Link
                        to={`/products/${product.productID}`}
                        className={clsx(styles.linkToDetail)}
                    >
                        <p className={clsx(styles.productName)}>
                            {product.productName}
                        </p>
                    </Link>
                    <p className={clsx(styles.productPrice)}>
                        ${productDetailActive?.type?.[0]?.price}.00
                    </p>
                    <ul className={clsx(styles.listProductColor)}>
                        {getColor(product)?.map((color, index) => {
                            return (
                                <li
                                    key={index}
                                    className={clsx(
                                        styles.itemProductColor,
                                        color === productDetailActive.color
                                            ? styles.active
                                            : '',
                                    )}
                                    style={{ backgroundColor: `${color}` }}
                                    onClick={() => handleClickIntoColor(color)}
                                ></li>
                            );
                        })}
                    </ul>
                    <ul className={clsx(styles.listSizeProduct)}>
                        {product &&
                            product.size.length > 0 &&
                            product.size.map((size, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={clsx(
                                            styles.itemProductSize,
                                            size === sizeSelected
                                                ? styles.active
                                                : '',
                                        )}
                                        onClick={() => {
                                            setSizeSelected(size);
                                        }}
                                    >
                                        {size}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
