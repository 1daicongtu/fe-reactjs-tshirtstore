import React, { useEffect, useRef, useState } from 'react';
import { GetColorName } from 'hex-color-to-color-name';
import clsx from 'clsx';
import styles from './PopupProductQuickView.module.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import getColor from '../../utils/getColor';
import PropTypes from 'prop-types';

const PopupProductQuickView = ({product, show, setShowPopup}) => {
    const refSlickSlider = useRef();
    const [quantity, setQuantity] = useState(1)
    const [sizeSelected, setSizeSelected] = useState(null)
    const [itemSelected, setItemSelected] = useState(null);
    const [colorSelected, setColorSelected] = useState(null);
    const [productDetailActive, setProductDetailActive] = useState(null);
    useEffect(()=>{
        if (product){
            setColorSelected(product.listProduct.length > 0 ? product.listProduct?.[0]?.color : "");
            setSizeSelected(product.size?.[0]);
            setItemSelected(product.listProduct.length > 0 ? product.listProduct?.[0] : "");
        }
    }, [product])
    useEffect(()=>{
        if (itemSelected){
            setProductDetailActive(itemSelected.type?.[0])
        }
    }, [itemSelected])

    const handleClickIntoColor2 = (color)=>{
        const productDetail = product.listProduct.find((productDetail)=>{
            return productDetail.color === color;
        })
        setItemSelected(productDetail)
        setColorSelected(color);
    }

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
              rows: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1
            }
          }
        ]
    };
    const handleChangeQuantity = (e)=>{

        if (e.target.value === ""){
            setQuantity(null)
            return;
        }
        let number = e.target.value;
        if (number.includes("-")){
            number = number.replaceAll("-", "");
        }
        setQuantity(Number(number))
    }


    return (
        (show && product)
        ? 
        <div className={clsx(styles.modal)}
            onClick={()=>setShowPopup(false)}
        >
            <div className={clsx(styles.modalBoxGroup)}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={clsx(styles.modalBox)}>
                    <div className={clsx(styles.modalHeader)}>
                        <span className={clsx(styles.modalBtnClose)}
                            onClick={()=>setShowPopup(false)}
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    <div className={`row ${clsx(styles.modalBody)}`}>
                        <div className={`col-12 col-md-6 col-lg-6 ${clsx(styles.modalBodyLeft)}`}>
                            <Slider ref={refSlickSlider} {...settings}>
                                <div className={clsx(styles.imageFront, styles.productImage)}>
                                    <img src={productDetailActive?.imageToShow?.front} alt="anh2" />
                                </div>
                                <div className={clsx(styles.imageBack, styles.productImage)}>
                                    <img src={productDetailActive?.imageToShow?.back} alt="anh1" />
                                </div>
                            </Slider>
                            <span className={clsx(styles.btnControlImage, styles.btnPrevImage)}
                                onClick={()=>refSlickSlider.current.slickPrev()}
                            >
                                <i class="fa-solid fa-angle-left"></i>
                            </span>
                            <span className={clsx(styles.btnControlImage, styles.btnNextImage)}
                                onClick={()=>refSlickSlider.current.slickNext()}
                            >
                                <i class="fa-solid fa-angle-right"></i>
                            </span>
                            <Link to="/" className={clsx(styles.viewDetailProduct)}>VIEW DETAIL</Link>
                        </div>
                        <div className={`col-12 col-md-6 col-lg-6 ${clsx(styles.modalBodyRight)}`}>
                            <Link to="/product/id" className={clsx(styles.linkToProductDetail)}>
                                <h3 className={clsx(styles.productName)}>{product.productName}</h3>
                            </Link>
                            
                            <Link to="/store/idStore" >
                                <img className={clsx(styles.storeImage)} src={product.storeIMG} alt="anh1" />
                            </Link>
                            <p className={clsx(styles.priceList)}>${Number.isInteger(product.costLowest) ? product.costLowest+".00" : product.costLowest} 
                            - ${Number.isInteger(product.costHighest) ? product.costHighest+".00" : product.costHighest}</p>
                            <p className={clsx(styles.productDesc)}>{product.descriptionLong}</p>
                            <p className={clsx(styles.productStyle)}>STYLE: LADIES-TEE</p>
                            <div className={clsx(styles.listProductImageDemo)}>
                                {
                                    itemSelected && itemSelected.type?.map((type, index)=>{
                                        return (
                                            <div key={index} className={clsx(styles.itemProductImageDemo, type.typeName === productDetailActive?.typeName ? styles.active : "")}
                                                onClick={()=>setProductDetailActive(type)}
                                            
                                            >
                                                <img src={type.imageSmall?.front} alt={type.typeName}/>
                                                <span className={clsx(styles.itemProductImageNameValue)}>{type.typeName}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p className={clsx(styles.productColorName)}>Color: {colorSelected ? GetColorName(colorSelected): ""}</p>
                            <div className={clsx(styles.listColor)}>
                                {
                                    getColor(product).map((color, index)=>{
                                        return  <span className={clsx(styles.productColorItem, colorSelected === color ? styles.active : "")} style={{backgroundColor: `${color}`}}
                                            onClick={()=>handleClickIntoColor2(color)}
                                        ></span>
                                    })
                                }

                            </div>
                            <p className={clsx(styles.productSize)}>SIZE: {sizeSelected}</p>
                            <div className={clsx(styles.listSize)}>
                                {product.size.map((size, index)=>{
                                    return <span className={clsx(styles.productSizeItem
                                        , sizeSelected === size ? styles.active : "")}
                                        onClick={()=>setSizeSelected(size)}
                                    >{size}</span>
                                })}
                               
                            </div>
                            <button className={clsx(styles.clearSelect)}>CLEAR</button>
                            <p className={clsx(styles.productPriceTotal)}>${productDetailActive?.price}</p>
                            <div className={clsx(styles.productBtnControlGroup)}>
                                <div className={clsx(styles.btnControlQuantity)}>
                                    <input type="number" className={clsx(styles.inputQuantityProduct)}
                                        value={quantity}
                                        onChange={handleChangeQuantity}
                                    />
                                    <div className={clsx(styles.boxModifiedQuantity)}>
                                        <button className={clsx(styles.btnChangeQuantityProduct, styles.btnIncreaseQuantity)}
                                            onClick={()=>setQuantity(quantity+1)}
                                        >
                                            <i class="fa-solid fa-angle-up"></i>
                                        </button>
                                        <button className={clsx(styles.btnChangeQuantityProduct, styles.btnDescreaseQuantity)}
                                            onClick={()=> {if (quantity > 1) setQuantity(quantity-1)}}
                                        >
                                            <i class="fa-solid fa-angle-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <button className={clsx(styles.btnControlAddToCart)}>
                                    ADD TO CART
                                </button>
                                <button className={clsx(styles.btnControlBuyNow)}>
                                    BUY NOW
                                </button>
                            </div>
                            <p className={clsx(styles.skulTitle)}>SKU:<span className={clsx(styles.skuValue)}>{product.SKU}</span></p>
                            <p className={clsx(styles.anotherInfo)}>Categories: 
                                {
                                    product.category?.map((category, index)=>{
                                        return (
                                            <Link to="/" className={clsx(styles.antherInfoValue)}>{category}</Link>
                                        )
                                    })
                                }
                                
                            </p>
                            <p className={clsx(styles.anotherInfo)}>Tag:
                                {
                                    product.tag?.map((tag, index)=>{
                                        return (
                                            <Link to="/" className={clsx(styles.antherInfoValue)}>{tag}</Link>
                                        )
                                    })
                                }
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
        : ""
    );
};
PopupProductQuickView.propTypes = {
    product: PropTypes.object,
    show: PropTypes.bool,
    setShowPopup: PropTypes.func
}

export default PopupProductQuickView;