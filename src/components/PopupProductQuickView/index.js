import React, { useEffect, useRef, useState } from 'react';
import { GetColorName } from 'hex-color-to-color-name';
import clsx from 'clsx';
import styles from './PopupProductQuickView.module.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import getColor from '../../utils/getColor';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPopup } from '../../redux/slices/popupQuickViewProduct';
import StyleTshirt from '../StyleTshirt';
import ColorListProduct from '../ColorListProduct';
import SizeListProduct from '../SizeListProduct';
import ControlQuantityProduct from '../ControlQuantityProduct';
import { handleDataAddToCart } from '../../utils/HandleWithCartList';

const PopupProductQuickView = () => {
    const product = useSelector((state) => state.popupProduct.product);
    const show = useSelector((state) => state.popupProduct.showPopup);
    const dispatch = useDispatch();

    const refSlickSlider = useRef();
    const [quantity, setQuantity] = useState(1);
    const [itemSelected, setItemSelected] = useState(null);
    const [productDetailActive, setProductDetailActive] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);

    useEffect(() => {
        if (product) {
            setItemSelected(
                product.listProduct.length > 0 ? product.listProduct?.[0] : '',
            );
        }
    }, [product]);
    useEffect(() => {
        if (itemSelected) {
            setProductDetailActive(itemSelected.type?.[0]);
        }
    }, [itemSelected]);
    
    const settings = {
        className: styles.slickSlider,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1198,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                },
            },
        ],
    };

    const handleSetSizeSelected = (size) => {
        setSizeSelected(size);
    }
    

    return show && product ? (
        <div
            className={clsx(styles.modal)}
            onClick={() => dispatch(setShowPopup(false))}
        >
            <div
                className={clsx(styles.modalBoxGroup)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={clsx(styles.modalBox)}>
                    <div className={clsx(styles.modalHeader)}>
                        <span
                            className={clsx(styles.modalBtnClose)}
                            onClick={() => dispatch(setShowPopup(false))}
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    <div className={`row ${clsx(styles.modalBody)}`}>
                        <div
                            className={`col-12 col-md-6 col-lg-6 ${clsx(
                                styles.modalBodyLeft,
                            )}`}
                        >
                            <Slider ref={refSlickSlider} {...settings}>
                                <div
                                    className={clsx(
                                        styles.imageFront,
                                        styles.productImage,
                                    )}
                                >
                                    <img
                                        src={
                                            productDetailActive?.imageToShow
                                                ?.front
                                        }
                                        alt="anh2"
                                    />
                                </div>
                                <div
                                    className={clsx(
                                        styles.imageBack,
                                        styles.productImage,
                                    )}
                                >
                                    <img
                                        src={
                                            productDetailActive?.imageToShow
                                                ?.back
                                        }
                                        alt="anh1"
                                    />
                                </div>
                            </Slider>
                            <span
                                className={clsx(
                                    styles.btnControlImage,
                                    styles.btnPrevImage,
                                )}
                                onClick={() =>
                                    refSlickSlider.current.slickPrev()
                                }
                            >
                                <i class="fa-solid fa-angle-left"></i>
                            </span>
                            <span
                                className={clsx(
                                    styles.btnControlImage,
                                    styles.btnNextImage,
                                )}
                                onClick={() =>
                                    refSlickSlider.current.slickNext()
                                }
                            >
                                <i class="fa-solid fa-angle-right"></i>
                            </span>
                            <Link
                                to={`/products/${product.productID}`}
                                className={clsx(styles.viewDetailProduct)}
                                onClick={
                                    () => dispatch(setShowPopup(false))
                                }
                            >
                                VIEW DETAIL
                            </Link>
                        </div>
                        <div
                            className={`col-12 col-md-6 col-lg-6 ${clsx(
                                styles.modalBodyRight,
                            )}`}
                        >
                            <Link
                                to="/product/id"
                                className={clsx(styles.linkToProductDetail)}
                            >
                                <h3 className={clsx(styles.productName)}>
                                    {product.productName}
                                </h3>
                            </Link>

                            <Link to="/store/idStore">
                                <img
                                    className={clsx(styles.storeImage)}
                                    src={product.storeIMG}
                                    alt="anh1"
                                />
                            </Link>
                            <p className={clsx(styles.priceList)}>
                                $
                                {Number.isInteger(product.costLowest)
                                    ? product.costLowest + '.00'
                                    : product.costLowest}
                                - $
                                {Number.isInteger(product.costHighest)
                                    ? product.costHighest + '.00'
                                    : product.costHighest}
                            </p>
                            <p className={clsx(styles.productDesc)}>
                                {product.descriptionLong}
                            </p>
                            <StyleTshirt
                                productDetailActive={productDetailActive}
                                itemSelected={itemSelected}
                                setProductDetailActive={setProductDetailActive}
                            ></StyleTshirt>
                            <ColorListProduct
                                product={product}
                                setItemSelected={setItemSelected}
                            ></ColorListProduct>
                            <SizeListProduct
                                product={product}
                                sizeSelected={sizeSelected}
                                handleSetaSizeSelected={handleSetSizeSelected}
                            ></SizeListProduct>

                            <p className={clsx(styles.productPriceTotal)}>
                                ${productDetailActive?.price}
                            </p>
                            <ControlQuantityProduct
                                quantity={quantity}
                                setQuantity={setQuantity}
                                dataAddToCart={handleDataAddToCart(product, itemSelected, sizeSelected, quantity, productDetailActive)}
                                
                            ></ControlQuantityProduct>
                            <p className={clsx(styles.skulTitle)}>
                                SKU:
                                <span className={clsx(styles.skuValue)}>
                                    {product.SKU}
                                </span>
                            </p>
                            <p className={clsx(styles.anotherInfo)}>
                                Categories:
                                {product.category?.map((category, index) => {
                                    return (
                                        <Link
                                            to="/"
                                            className={clsx(
                                                styles.antherInfoValue,
                                            )}
                                        >
                                            {category}
                                        </Link>
                                    );
                                })}
                            </p>
                            <p className={clsx(styles.anotherInfo)}>
                                Tag:
                                {product.tag?.map((tag, index) => {
                                    return (
                                        <Link
                                            to="/"
                                            className={clsx(
                                                styles.antherInfoValue,
                                            )}
                                        >
                                            {tag}
                                        </Link>
                                    );
                                })}
                            </p>
                            <div className={clsx(styles.boxShare)}>
                                <div className={clsx(styles.boxTitle)}>
                                    <i class="fa-solid fa-share"></i>
                                    <span>Share</span>
                                </div>
                                <a href="https://www.facebook.com/">
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://twitter.com">
                                    <i class="fa-brands fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                                <a href="mailto:someone@example.com">
                                    <i class="fa-regular fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ''
    );
};
PopupProductQuickView.propTypes = {
    product: PropTypes.object,
    show: PropTypes.bool,
    setShowPopup: PropTypes.func,
};

export default PopupProductQuickView;
