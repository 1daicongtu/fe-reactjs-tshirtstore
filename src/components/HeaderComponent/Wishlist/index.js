import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Wishlist.module.scss';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemInWistListByProductID, removeItemById } from '../../../redux/slices/wishlistSlice';
import { setWistList } from '../../../redux/slices/headerStateSlice';


import {
    setProductToShow,
    setShowPopup,
} from '../../../redux/slices/popupQuickViewProduct';

const Wishlist = () => {
    const dispatch = useDispatch();
    const wistListStore = useSelector((state) => state.wishlist.wishLists);
    const wistList = useSelector((state) => state.headerStates.wistList);
    const userLogin = useSelector(state => state.userLogin) 
 
    function handleOpenPopup(product) {
        dispatch(setWistList(false));
        dispatch(setProductToShow(product));
        dispatch(setShowPopup(true));
    }

    const handleDeleteItemWishlist = ({productID, productObjectId}) => {
       
        if (userLogin.isLogin){
            dispatch(deleteItemInWistListByProductID({userID: userLogin.user?._id, productObjectId, productID}))
        } else {
            dispatch(removeItemById(productID));
        }
    }

    return (
        <>
            <div
                className={`${clsx(
                    styles.modal,
                    !wistList ? styles.unactive : '',
                )}`}
                onClick={() => dispatch(setWistList(false))}
            ></div>

            <div
                className={clsx(styles.modalBox, wistList ? styles.active : '')}
            >
                <div className={clsx(styles.modalHeader)}>
                    <h1>Wishlist</h1>
                    <span
                        className={clsx(styles.btnCloseModal)}
                        onClick={() => dispatch(setWistList(false))}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </span>
                </div>

                <div className={clsx(styles.modalBody)}>
                    {wistListStore && wistListStore.length > 0
                        ? wistListStore.map((product, index) => {
                              return (
                                  <div
                                      key={product.productID}
                                      className={clsx(styles.wishlistItem)}
                                  >
                                      <div
                                          className={clsx(
                                              styles.wishlistItemLeft,
                                          )}
                                      >
                                          <div
                                              className={clsx(
                                                  styles.wishItemImage,
                                              )}
                                          >
                                              <Link to={`/products/${product.productID}`}
                                                onClick={()=>{dispatch(setWistList(false))}}
                                              >
                                                  <img
                                                      src={
                                                          product
                                                              .imageSmall?.[0]
                                                              ?.imgURL
                                                      }
                                                      alt={`${product.imageSmall?.[0]?.name}-${index}`}
                                                  />
                                              </Link>
                                          </div>
                                          <div
                                              className={clsx(
                                                  styles.wishItemContent,
                                              )}
                                          >
                                              <NavLink
                                                  to={`/products/${product.productID}`}
                                                  onClick={()=>{dispatch(setWistList(false))}}
                                                  className={clsx(
                                                      styles.navlink,
                                                      styles.productName,
                                                  )}
                                              >
                                                  {product.productName}
                                              </NavLink>
                                              <p
                                                  className={clsx(
                                                      styles.itemProductPrice,
                                                  )}
                                              >
                                                  $
                                                  {!Number.isInteger(
                                                      product.costLowest,
                                                  )
                                                      ? product.costLowest
                                                      : product.costLowest.toFixed(
                                                            2,
                                                        )}
                                                  -$
                                                  {!Number.isInteger(
                                                      product.costHighest,
                                                  )
                                                      ? product.costHighest
                                                      : product.costHighest.toFixed(
                                                            2,
                                                        )}
                                              </p>

                                              <p
                                                  className={clsx(
                                                      styles.navlink,
                                                      styles.selectOption,
                                                  )}
                                                  onClick={() =>
                                                      handleOpenPopup(product)
                                                  }
                                              >
                                                  SELECT OPTIONS
                                              </p>
                                          </div>
                                      </div>
                                      <div
                                          className={clsx(
                                              styles.wishListRemoveItem,
                                          )}
                                      >
                                          <span
                                              onClick={()=> handleDeleteItemWishlist({
                                                    productID: product.productID,
                                                    productObjectId: product._id,
                                              })}
                                          >
                                              <i className="fa-solid fa-xmark"></i>
                                          </span>
                                      </div>
                                  </div>
                              );
                          })
                        : ''}
                </div>
            </div>
        </>
    );
};

export default Wishlist;
