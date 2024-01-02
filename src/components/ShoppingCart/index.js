import clsx from "clsx"
import styles from "./stylesShoppingCart.module.scss"
import configs from "../../config"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import calcTotalPriceOfCart from "../../utils/calcTotalPriceOfCart";
import { Tooltip } from 'react-tooltip';
import { deleteItemCartToServer, removeCart, setVoucher, updateCart, updateCartItemToServer } from "../../redux/slices/cartSlice";
import guarenteedSafeImg from "../../assets/trust_badge(1).png"
import { GetColorName } from "hex-color-to-color-name";
import ToastMessage, { addToastMessage } from "../HeaderComponent/ToastMessage";
import getFinalTotalPriceOfCart from "../../utils/getFinalTotalPriceOfCart";
import { updateInfoCheckout } from "../../redux/slices/infoCheckoutSlice";

const stepToOrder = [
    {
        numberStep: "01",
        textStep: "Shopping Cart",
        descStep: "Manage Your Items List",
        haveLink: false,
        link: null
    },
    {
        numberStep: "02",
        textStep: "Checkout Details",
        descStep: "Checkout Your Items List",
        haveLink: true,
        link: configs.routes.checkout
    },
    {
        numberStep: "03",
        textStep: "Order Complete",
        descStep: "Review Your Order",
        haveLink: false,
        link: null
    }
]

const listReview = [
    {
        content: "By far the most comfortable clothes label I’ve ever worn. Perfect for long travels.",
        star: 5,
        name: "Steve Alia."
    }, 
    {
        content: "The colors exactly what I was looking for! I would definitely order again.",
        star: 4,
        name: "Eric Rowen."
    }, 
    {
        content: "This was my first order and I was super pleased. Quick service at a good price.",
        star: 5,
        name: "Ardell."
    }, 
]

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const voucherSelected = useSelector(state => state.cart.voucher);
    const listCoupon = useSelector(state => state.coupon.couponList)
    const infoCheckout = useSelector(state => state.infoCheckout)
    const [totalPrice, setTotalPrice] = useState(0);
    const cartStore = useSelector(state => state.cart.cart)
    const [showChangeAddress, setShowChangeAddress] = useState(false);
    const [country, setCountry] = useState("Viet Nam");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [inputCouponCode, setInputCouponCode] = useState("");
    const userLogin = useSelector(state => state.userLogin)


    useEffect(()=>{
        setTotalPrice(calcTotalPriceOfCart(cartStore));
    }, [cartStore])

    console.log(cartStore)

    function handleClickApplyCouponCode(){
        if(inputCouponCode){
            const coupon = listCoupon.find(coupon => coupon.code.toUpperCase() === inputCouponCode.toUpperCase());
            if(coupon){
                dispatch(setVoucher(coupon))

                    addToastMessage({
                        title: "Apply coupon code successfully!",
                        type: "success",
                        message: `Coupon code ${coupon.code} is applied!`
                    })

            } else {
                
                    addToastMessage({
                        title: "Apply coupon code failed!",
                        type: "error",
                        message: `Coupon code is not valid!`
                    })

            }
        }
    }
    function handleClickUpdateCheckoutInfo(){
        dispatch(updateInfoCheckout({
            ...infoCheckout,
            country: country,
            city: city,
            passcode: postcode
        }))
    }

    const handleDeleteItemCart = async (itemCart)=>{
        if (userLogin.isLogin){
            
            const res = await dispatch(deleteItemCartToServer({
                userID: userLogin.user?._id,
                productID: itemCart.productID,
                sizeSelected: itemCart.sizeSelected,
                colorSelected: itemCart.colorSelected,
                typeName: itemCart.productDetailSelected?.typeName
            }))

        } else {
            dispatch(removeCart({
                productID: itemCart.productID, 
                sizeSelected: itemCart.sizeSelected, 
                colorSelected: itemCart.colorSelected, 
                typeName: itemCart.productDetailSelected?.typeName
            }))
        }
    }
    const handleIncreaseQuantity = (itemCart, quantity) => {
        handleUpdateItemCart(quantity - 0 + 1, itemCart);
    }
    const handleDecreaseQuantity = (itemCart, quantity) => {
        if (quantity > 1) {
            handleUpdateItemCart(quantity - 1, itemCart);
        }
    }
    const handleUpdateItemCart = (newQuantity, itemCart)=>{
        if (userLogin.isLogin){
            dispatch(updateCartItemToServer({
                userID: userLogin.user?._id,
                productID: itemCart.productID,
                sizeSelected: itemCart.sizeSelected,
                colorSelected: itemCart.colorSelected,
                productDetailSelected: itemCart.productDetailSelected,
                quantity: newQuantity
            }))
        } else {
            dispatch(updateCart({
                productID: itemCart.productID,
                sizeSelected: itemCart.sizeSelected,
                colorSelected: itemCart.colorSelected,
                productDetailSelected: itemCart.productDetailSelected,
                quantity: newQuantity
            }))
        }  
    }
    const handleChangeQuantityWithKeyboard = (e, itemCart)=>{
        if (e.target.value > 0) {
            handleUpdateItemCart(e.target.value - 0, itemCart);
        } else {
            handleUpdateItemCart(1, itemCart);
        }
    
    }
  return (
    <div className={clsx(styles.shoppingCartWrapper)}>
        <div className={clsx(styles.stepByStepToOrderWrapper)}>
            <div className={clsx(styles.stepByStepToOrder)}>
                {
                    stepToOrder.map((step, index) => {
                        return (
                                step.haveLink 
                                ?
                                <Link to={step.haveLink ? step.link : "#"} key={index} className={clsx(styles.linkToStep)}>
                                    <div className={clsx(styles.stepsToOrder, index === 0 ? styles.firstStepToOrder : null)}>
                                        <p className={clsx(styles.numberOfStepToOrder)}>{step.numberStep}</p>
                                        <div className={clsx(styles.boxContentToOrder)}>
                                            <p className={clsx(styles.textStepToOrder)}>{step.textStep}</p>
                                            <p className={clsx(styles.descStepToOrder)}>{step.descStep}</p>
                                        </div>
                                    </div>
                                </Link>
                                :
                                <div className={clsx(styles.stepsToOrder, index === 0 ? styles.firstStepToOrder : null)} key={index}>
                                    <p className={clsx(styles.numberOfStepToOrder)}>{step.numberStep}</p>
                                    <div className={clsx(styles.boxContentToOrder)}>
                                        <p className={clsx(styles.textStepToOrder)}>{step.textStep}</p>
                                        <p className={clsx(styles.descStepToOrder)}>{step.descStep}</p>
                                    </div>
                                </div>
                        )
                    })
                }
                
            </div>
        </div>
        <div className={clsx(styles.bodyShoppingCart)}>
            <div className={clsx("row g-0", styles.rowBodyShoppingCart)}>
                <div className={clsx("col-12 col-md-8 col-lg-8", styles.colBodyShoppingCart)}>
                    <table className={clsx(styles.productsTable)}>
                        <thead>
                            <tr>
                                <th>PRODUCT</th>
                                <th className={clsx(styles.colNeedRemoveWithMobileResponsive)}>PRICE</th>
                                <th className={clsx(styles.colNeedRemoveWithMobileResponsive)}>QUANTITY</th>
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                cartStore 
                                && 
                                cartStore.length > 0
                                && 
                                cartStore.map((product, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td scope="row">
                                                <div className={clsx(styles.productInfo)}>
                                                    <button className={clsx(styles.btnRemoveProduct)}
                                                        onClick={()=>handleDeleteItemCart(product)}
                                                    >
                                                        <i class="fa-solid fa-xmark"></i>
                                                    </button>
                                                    <div className={clsx(styles.productImage)}>
                                                        <img src={product.productDetailSelected?.imageSmall?.front} alt="product" />
                                                    </div>
                                                    <div className={clsx(styles.productInfoDetail)}>
                                                        <p className={clsx(styles.productName)}>{product.productName}</p>
                                                        <p className={clsx(styles.productOtherInfoName)}>Style: <span className={clsx(styles.productOtherInfoValue)}>{product.productDetailSelected?.typeName}</span></p>
                                                        <p className={clsx(styles.productOtherInfoName)}>Color: <span className={clsx(styles.productOtherInfoValue)}>{GetColorName(product.colorSelected)}</span></p>
                                                        <p className={clsx(styles.productOtherInfoName)}>Size: <span className={clsx(styles.productOtherInfoValue)}>{product.sizeSelected}</span></p>
                                                        <p
                                                            className={clsx(styles.unitPriceAtProductCol)}
                                                        >${(product.productDetailSelected?.price).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={clsx(styles.colNeedRemoveWithMobileResponsive)}>
                                                <p className={clsx(styles.productPrice)}>${(product.productDetailSelected?.price).toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <div className={clsx(styles.productQuantityBox)}>
                                                
                                                    <input type="number" className={clsx(styles.inputProductQuantity)}
                                                        value={product.quantity}
                                                        onChange={(e) => {
                                                            if (e.target.value > 0) {
                                                                // dispatch(setQuantityOfProductInCart({
                                                                //     id: product.id,
                                                                //     quantity: e.target.value
                                                                // }))
                                                            }
                                                        }}
                                                        
                                                    />
                                                    <div className={clsx(styles.boxControlProductQuantity)}>
                                                        <button className={clsx(styles.topControlProductQuantity)}
                                                            onClick={()=>handleIncreaseQuantity(product, product.quantity)}
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                            
                                                        </button>
                                                        <button className={clsx(styles.bottomControlProductQuantity)}
                                                            onClick={()=>handleDecreaseQuantity(product, product.quantity)}
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={clsx(styles.colNeedRemoveWithMobileResponsive)}>
                                                <p className={clsx(styles.subTotalProductPrice)}>${
                                                    (product.productDetailSelected?.price * product.quantity).toFixed(2)
                                                }</p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className={clsx(styles.boxProcessFreeship)}>
                        <div
                            className={clsx(
                                styles.totalProcessFreeship,
                            )}
                        >
                            <div
                                className={clsx(
                                    styles.currentProcessFreeship,
                                )}
                                    style={{
                                        width: totalPrice/process.env.REACT_APP_STANDARD_FREESHIPPING_COST * 100 >= 100
                                        ? "100%"
                                        : (totalPrice/process.env.REACT_APP_STANDARD_FREESHIPPING_COST * 100) + "%"
                                    }}
                                >
                                    <span
                                        className={clsx(
                                            styles.percentProcess,
                                        )}
                                    >
                                        {totalPrice/process.env.REACT_APP_STANDARD_FREESHIPPING_COST * 100 >= 100 
                                            ? 
                                                100
                                                :
                                                (totalPrice/process.env.REACT_APP_STANDARD_FREESHIPPING_COST * 100)
                                                }%
                                    </span>
                            </div>
                        </div>
                    </div>
                    {
                        totalPrice < process.env.REACT_APP_STANDARD_FREESHIPPING_COST 
                        ?
                        <div className={clsx(styles.noteFreeshipNotSuccess)}>
                            <p
                                className={clsx(styles.descNoteFreeshipNotSuccess)}
                            >Spend <span className={clsx(styles.moneyNeedToFreeship)}>${
                                (process.env.REACT_APP_STANDARD_FREESHIPPING_COST - totalPrice).toFixed(2)
                                }</span> more to reach <span className={clsx(styles.fontWeightWithUppercase)}>
                                Free Ship
                                </span></p>
                        </div>
                        :
                            <div className={clsx(styles.noteFreeshipSuccess)}>
                                <span className={clsx(styles.iconNoteFreeship)}>
                                    <i
                                        className="fa-regular fa-circle-check"
                                        style={{ color: '#37c347' }}
                                    ></i>
                                </span>
                                <span className={clsx(styles.textNoteFreeship)}>
                                    Congratulations! You've got free shipping.
                                </span>
                            </div>
                    }
                    <div className={clsx(styles.boxInputVoucherCode)}>
                        <input type="text" placeholder="Coupon Code" className={clsx(styles.inputVoucherCode)}
                            value={inputCouponCode}
                            onChange={(e) => setInputCouponCode(e.target.value)}
                        />
                        <button className={clsx(styles.btnApplyVoucherCode)}
                            onClick={handleClickApplyCouponCode}
                        >Apply Coupon</button>
                    </div>
                    <div className={clsx(styles.reviewListFromCustomersWrapper)}>
                        <p className={clsx(styles.titleReviewFromCustomer)}>Reviews From Customers</p>
                        <div className={clsx(styles.boxReviewsFromCustomer)}>
                            {
                                listReview.map((review, index) => {
                                    return (
                                        <div className={clsx(styles.itemReviewsFromCustomer)} key={index}>
                                            <p className={clsx(styles.contentReviewFromCustomer)}>{review.content}</p>
                                            <div className={clsx(styles.starList)}>
                                                {
                                                    [...Array(review.star)].map((star, index) => {
                                                        return (
                                                            <i className={`fa-solid fa-star ${styles.productIconStarSolids}`} key={index}></i>
                                                        )
                                                    })
                                                }
                                                {
                                                    [...Array(5 - review.star)].map((star, index) => {
                                                        return (
                                                            <i className={`fa-regular fa-star ${styles.productIconStarRegulars}`} key={index}></i>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className={clsx(styles.nameUserReview)}>{review.name}</p>
                                        </div>
                                    )
                                })
                            }
                           
                        </div>
                    </div>
                </div>
                <div className={clsx("col-12 col-md-4 col-lg-4", styles.colBodyShoppingCart)}>
                    <div className={clsx(styles.cartTotalWrapper)}>
                        <p className={clsx(styles.titleCartTotal)}>CART TOTALS</p>
                        <div className={clsx(styles.flexBoxCartTotalItem)}>
                            <p className={clsx(styles.titleCartTotalInfo)}>Subtotal</p>
                            <p className={clsx(styles.finalTotalPrice)}>${totalPrice.toFixed(2)}</p>
                        </div>
                        {
                            voucherSelected &&
                            <div className={clsx(styles.flexBoxCartTotalItem)}>
                                <p className={clsx(styles.titleCartTotalInfo)}>Coupon</p>
                                <div>
                                    <Tooltip id="tooltip-removeCoupon" />
                                    <div
                                        className={clsx(styles.couponChild)}
                                        data-tooltip-id="tooltip-removeCoupon"
                                        data-tooltip-content="remove"
                                        onClick={() => {
                                            dispatch(setVoucher(null))
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                        <button>{voucherSelected.code}</button>
                                        <p className={clsx(styles.moneyReduced)}>-${
                                            voucherSelected.discountType == "percent" 
                                            ? (totalPrice * voucherSelected.discount / 100).toFixed(2) 
                                            : 
                                            voucherSelected.discountType == "money"
                                            ? voucherSelected.discount.toFixed(2)
                                            :
                                            voucherSelected.discountType == "ship fee"
                                            ? voucherSelected.discount >= process.env.REACT_APP_SHIPPING_FEE
                                                ? process.env.REACT_APP_SHIPPING_FEE
                                                : voucherSelected.discount.toFixed(2)
                                                : 0
                                        }</p>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={clsx(styles.boxShippingInfoWrapper)}>
                            <div className={clsx(styles.boxShippingInfoItem)}>
                                <p className={clsx(styles.titleCartTotalInfo)}>Shipping</p>
                                <p className={clsx(styles.finalTotalPrice)}>{
                                    totalPrice >= process.env.REACT_APP_STANDARD_FREESHIPPING_COST 
                                    ? "Free Shipping" 
                                    : "Flat rate: " + process.env.REACT_APP_SHIPPING_FEE
                                }</p>
                            </div>
                            {
                                infoCheckout 
                                &&
                                (infoCheckout.country || infoCheckout.city || infoCheckout.passcode || infoCheckout.streetAddress)
                                &&
                                <p className={clsx(styles.shippingInfoDetailTitle)}>Shipping to <span className={clsx(styles.shippingInfoDetailValue)}> {infoCheckout?.streetAddress && `${infoCheckout.streetAddress}, `} {infoCheckout?.city && `${infoCheckout.city}, `} {infoCheckout?.passcode && `${infoCheckout.passcode}, `} {infoCheckout?.country && `${infoCheckout.country}.`}</span></p>
                            }
                        
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <button className={clsx(styles.btnChangeAddress)}
                                    onClick={()=> setShowChangeAddress(!showChangeAddress)}
                                >Change address</button>
                            </div>

                            <div className={clsx(styles.parentBoxTypeInfoAddress, showChangeAddress ? styles.active : "")}>
                                <div className={clsx(styles.childBoxTypeInfoAddress)}>
                                    <div className={clsx(styles.formGroupInputAddressInfo)}>
                                        <label for="nameCountry" className={clsx(styles.active)}>Country / region</label>
                                        <select
                                            name="nameCountry"
                                            id="nameCountry"
                                            data-show-subtext="true"
                                            data-live-search="true"
                                            className={clsx(styles.inputInfoShipping, styles.active)}
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            <option value="Afghanistan">Afghanistan</option>
                                            <option value="Aland Islands">Aland Islands</option>
                                            <option value="Albania">Albania</option>
                                            <option value="Algeria">Algeria</option>
                                            <option value="American Samoa">
                                                American Samoa
                                            </option>
                                            <option value="Andorra">Andorra</option>
                                            <option value="Angola">Angola</option>
                                            <option value="Anguilla">Anguilla</option>
                                            <option value="Antarctica">Antarctica</option>
                                            <option value="Antigua and Barbuda">
                                                Antigua and Barbuda
                                            </option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Armenia">Armenia</option>
                                            <option value="Aruba">Aruba</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Bahamas">Bahamas</option>
                                            <option value="Bahrain">Bahrain</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Barbados">Barbados</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Belize">Belize</option>
                                            <option value="Benin">Benin</option>
                                            <option value="Bermuda">Bermuda</option>
                                            <option value="Bhutan">Bhutan</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Bonaire, Sint Eustatius and Saba">
                                                Bonaire, Sint Eustatius and Saba
                                            </option>
                                            <option value="Bosnia and Herzegovina">
                                                Bosnia and Herzegovina
                                            </option>
                                            <option value="Botswana">Botswana</option>
                                            <option value="Bouvet Island">Bouvet Island</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="British Indian Ocean Territory">
                                                British Indian Ocean Territory
                                            </option>
                                            <option value="Brunei Darussalam">
                                                Brunei Darussalam
                                            </option>
                                            <option value="Bulgaria">Bulgaria</option>
                                            <option value="Burkina Faso">Burkina Faso</option>
                                            <option value="Burundi">Burundi</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Cameroon">Cameroon</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Cape Verde">Cape Verde</option>
                                            <option value="Cayman Islands">
                                                Cayman Islands
                                            </option>
                                            <option value="Central African Republic">
                                                Central African Republic
                                            </option>
                                            <option value="Chad">Chad</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">
                                                Christmas Island
                                            </option>
                                            <option value="Cocos (Keeling) Islands">
                                                Cocos (Keeling) Islands
                                            </option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Congo, Democratic Republic of the Congo">
                                                Congo, Democratic Republic of the Congo
                                            </option>
                                            <option value="Cook Islands">Cook Islands</option>
                                            <option value="Costa Rica">Costa Rica</option>
                                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                                            <option value="Croatia">Croatia</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="Curacao">Curacao</option>
                                            <option value="Cyprus">Cyprus</option>
                                            <option value="Czech Republic">
                                                Czech Republic
                                            </option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Dominica">Dominica</option>
                                            <option value="Dominican Republic">
                                                Dominican Republic
                                            </option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="El Salvador">El Salvador</option>
                                            <option value="Equatorial Guinea">
                                                Equatorial Guinea
                                            </option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Estonia">Estonia</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Falkland Islands (Malvinas)">
                                                Falkland Islands (Malvinas)
                                            </option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">
                                                French Polynesia
                                            </option>
                                            <option value="French Southern Territories">
                                                French Southern Territories
                                            </option>
                                            <option value="Gabon">Gabon</option>
                                            <option value="Gambia">Gambia</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Gibraltar">Gibraltar</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Greenland">Greenland</option>
                                            <option value="Grenada">Grenada</option>
                                            <option value="Guadeloupe">Guadeloupe</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Guernsey">Guernsey</option>
                                            <option value="Guinea">Guinea</option>
                                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                                            <option value="Guyana">Guyana</option>
                                            <option value="Haiti">Haiti</option>
                                            <option value="Heard Island and Mcdonald Islands">
                                                Heard Island and Mcdonald Islands
                                            </option>
                                            <option value="Holy See (Vatican City State)">
                                                Holy See (Vatican City State)
                                            </option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Iran, Islamic Republic of">
                                                Iran, Islamic Republic of
                                            </option>
                                            <option value="Iraq">Iraq</option>
                                            <option value="Ireland">Ireland</option>
                                            <option value="Isle of Man">Isle of Man</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Jamaica">Jamaica</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Jersey">Jersey</option>
                                            <option value="Jordan">Jordan</option>
                                            <option value="Kazakhstan">Kazakhstan</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Kiribati">Kiribati</option>
                                            <option value="Korea, Democratic People's Republic of">
                                                Korea, Democratic People's Republic of
                                            </option>
                                            <option value="Korea, Republic of">
                                                Korea, Republic of
                                            </option>
                                            <option value="Kosovo">Kosovo</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Lao People's Democratic Republic">
                                                Lao People's Democratic Republic
                                            </option>
                                            <option value="Latvia">Latvia</option>
                                            <option value="Lebanon">Lebanon</option>
                                            <option value="Lesotho">Lesotho</option>
                                            <option value="Liberia">Liberia</option>
                                            <option value="Libyan Arab Jamahiriya">
                                                Libyan Arab Jamahiriya
                                            </option>
                                            <option value="Liechtenstein">Liechtenstein</option>
                                            <option value="Lithuania">Lithuania</option>
                                            <option value="Luxembourg">Luxembourg</option>
                                            <option value="Macao">Macao</option>
                                            <option value="Macedonia, the Former Yugoslav Republic of">
                                                Macedonia, the Former Yugoslav Republic of
                                            </option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Malawi">Malawi</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Maldives">Maldives</option>
                                            <option value="Mali">Mali</option>
                                            <option value="Malta">Malta</option>
                                            <option value="Marshall Islands">
                                                Marshall Islands
                                            </option>
                                            <option value="Martinique">Martinique</option>
                                            <option value="Mauritania">Mauritania</option>
                                            <option value="Mauritius">Mauritius</option>
                                            <option value="Mayotte">Mayotte</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Micronesia, Federated States of">
                                                Micronesia, Federated States of
                                            </option>
                                            <option value="Moldova, Republic of">
                                                Moldova, Republic of
                                            </option>
                                            <option value="Monaco">Monaco</option>
                                            <option value="Mongolia">Mongolia</option>
                                            <option value="Montenegro">Montenegro</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Morocco">Morocco</option>
                                            <option value="Mozambique">Mozambique</option>
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Namibia">Namibia</option>
                                            <option value="Nauru">Nauru</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Netherlands">Netherlands</option>
                                            <option value="Netherlands Antilles">
                                                Netherlands Antilles
                                            </option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">
                                                Norfolk Island
                                            </option>
                                            <option value="Northern Mariana Islands">
                                                Northern Mariana Islands
                                            </option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Palestinian Territory, Occupied">
                                                Palestinian Territory, Occupied
                                            </option>
                                            <option value="Panama">Panama</option>
                                            <option value="Papua New Guinea">
                                                Papua New Guinea
                                            </option>
                                            <option value="Paraguay">Paraguay</option>
                                            <option value="Peru">Peru</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="Pitcairn">Pitcairn</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Qatar">Qatar</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Romania">Romania</option>
                                            <option value="Russian Federation">
                                                Russian Federation
                                            </option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Saint Barthelemy">
                                                Saint Barthelemy
                                            </option>
                                            <option value="Saint Helena">Saint Helena</option>
                                            <option value="Saint Kitts and Nevis">
                                                Saint Kitts and Nevis
                                            </option>
                                            <option value="Saint Lucia">Saint Lucia</option>
                                            <option value="Saint Martin">Saint Martin</option>
                                            <option value="Saint Pierre and Miquelon">
                                                Saint Pierre and Miquelon
                                            </option>
                                            <option value="Saint Vincent and the Grenadines">
                                                Saint Vincent and the Grenadines
                                            </option>
                                            <option value="Samoa">Samoa</option>
                                            <option value="San Marino">San Marino</option>
                                            <option value="Sao Tome and Principe">
                                                Sao Tome and Principe
                                            </option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Serbia">Serbia</option>
                                            <option value="Serbia and Montenegro">
                                                Serbia and Montenegro
                                            </option>
                                            <option value="Seychelles">Seychelles</option>
                                            <option value="Sierra Leone">Sierra Leone</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Sint Maarten">Sint Maarten</option>
                                            <option value="Slovakia">Slovakia</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">
                                                Solomon Islands
                                            </option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="South Georgia and the South Sandwich Islands">
                                                South Georgia and the South Sandwich Islands
                                            </option>
                                            <option value="South Sudan">South Sudan</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Svalbard and Jan Mayen">
                                                Svalbard and Jan Mayen
                                            </option>
                                            <option value="Swaziland">Swaziland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syrian Arab Republic">
                                                Syrian Arab Republic
                                            </option>
                                            <option value="Taiwan, Province of China">
                                                Taiwan, Province of China
                                            </option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania, United Republic of">
                                                Tanzania, United Republic of
                                            </option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Timor-Leste">Timor-Leste</option>
                                            <option value="Togo">Togo</option>
                                            <option value="Tokelau">Tokelau</option>
                                            <option value="Tonga">Tonga</option>
                                            <option value="Trinidad and Tobago">
                                                Trinidad and Tobago
                                            </option>
                                            <option value="Tunisia">Tunisia</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Turkmenistan">Turkmenistan</option>
                                            <option value="Turks and Caicos Islands">
                                                Turks and Caicos Islands
                                            </option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">
                                                United Arab Emirates
                                            </option>
                                            <option value="United Kingdom">
                                                United Kingdom
                                            </option>
                                            <option value="United States">United States</option>
                                            <option value="United States Minor Outlying Islands">
                                                United States Minor Outlying Islands
                                            </option>
                                            <option value="Uruguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Venezuela">Venezuela</option>
                                            <option value="Viet Nam">Viet Nam</option>
                                            <option value="Virgin Islands, British">
                                                Virgin Islands, British
                                            </option>
                                            <option value="Virgin Islands, U.s.">
                                                Virgin Islands, U.s.
                                            </option>
                                            <option value="Wallis and Futuna">
                                                Wallis and Futuna
                                            </option>
                                            <option value="Western Sahara">
                                                Western Sahara
                                            </option>
                                            <option value="Yemen">Yemen</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Zimbabwe">Zimbabwe</option>
                                        </select>
                                    </div>
                                    <div className={clsx(styles.formGroupInputAddressInfo)}>
                                        <label for="nameCountry" className={clsx(city ? styles.active : "")}>Town / City <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            required
                                            className={clsx(styles.inputInfoShipping, city ? styles.active : "")}
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className={clsx(styles.formGroupInputAddressInfo)}>
                                        <label for="nameCountry" className={clsx(postcode ? styles.active : "")}>Postcode / Zip  <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Postcode / ZIP"
                                            required
                                            className={clsx(styles.inputInfoShipping, postcode ? styles.active : "")}
                                            value={postcode}
                                            onChange={(e) => setPostcode(e.target.value)}
                                        />
                                    </div>
                                    <button className={clsx(styles.btnUpdateAddressInfo)}
                                        onClick={handleClickUpdateCheckoutInfo}
                                    >update</button>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className={clsx(styles.boxFinalTotalPriceAfterApplyCoupon)}>
                                <p className={clsx(styles.titleTotolPrice)}>Total</p>
                                <p className={clsx(styles.finalTotalPriceAfterApplyCoupon)}>${getFinalTotalPriceOfCart(totalPrice, voucherSelected).toFixed(2)}</p>
                            </div>
                            <div className={clsx(styles.boxBtnCheckout)}>
                                <button className={clsx(styles.btnCheckout)}>Proceed to checkout</button>
                            </div>
                        </div>
                        <img 
                            className={clsx(styles.productGuarenteedSafeImg)}
                            src={guarenteedSafeImg} alt="guarented img"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
