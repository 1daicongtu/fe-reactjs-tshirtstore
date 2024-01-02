import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';
import styles from './Cart.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartList } from '../../../redux/slices/headerStateSlice';
import ItemCart from './ItemCart';
import calcTotalPriceOfCart from "../../../utils/calcTotalPriceOfCart";
import getFinalTotalPriceOfCart from '../../../utils/getFinalTotalPriceOfCart';
import { setVoucher } from '../../../redux/slices/cartSlice';
import { updateInfoCheckout } from '../../../redux/slices/infoCheckoutSlice';
import configs from '../../../config';

const Cart = () => {
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.headerStates.cartList);
    const voucherSelected = useSelector(state => state.cart.voucher);
    const cartStore = useSelector(state => state.cart.cart)
    const infoCheckout = useSelector(state => state.infoCheckout)
    const [windowNote, setWindowNote] = React.useState(false);
    const [windowShipping, setWindowShipping] = React.useState(false);
    const [windowCoupon, setWindowCoupon] = React.useState(false);
    const [inputVoucher, setInputVoucher] = React.useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const listCoupon = useSelector(state => state.coupon.couponList)

    const [note, setNote] = useState(""); 
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [passcode, setPasscode] = useState("");

    useEffect(()=>{
        setTotalPrice(calcTotalPriceOfCart(cartStore));
    }, [cartStore])

    useEffect(()=>{
        setNote(infoCheckout.note)
        setCountry(infoCheckout.country)
        setCity(infoCheckout.city)
        setPasscode(infoCheckout.passcode)
    }, [infoCheckout])

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    
    const handleClickVoucher = (item) => {
        dispatch(setVoucher(item));
        setWindowCoupon(false);
    };

    const handleSaveNote = () => {
        setWindowNote(false);
        dispatch(updateInfoCheckout({
            ...infoCheckout,
            note: note
        }))
    };
    const handleUpdateShipping = (e) => {
        e.preventDefault()

        setWindowShipping(false);
        dispatch(updateInfoCheckout({
            ...infoCheckout,
            country: country,
            city: city,
            passcode: passcode
        }))
    };


    const handleUpdateCoupon = () => {
        if (inputVoucher.trim() !== '') {
            let flag = false;
            listCoupon.forEach((item) => {
                if (
                    item.code.toUpperCase() ===
                    inputVoucher.trim().toUpperCase()
                ) {
                    dispatch(setVoucher(item));
                    flag = true;
                }
            });
            if (flag === false) {
                dispatch(setVoucher(null));
            }
            setInputVoucher('');
        }
        setWindowCoupon(false);
    };


    return (
        <>
            <div
                className={clsx(styles.modal, !cartList ? styles.unactive : '')}
                onClick={() => dispatch(setCartList(false))}
            ></div>
            <div
                className={clsx(styles.modalBox, cartList ? styles.active : '')}
            >
                <div className={clsx(styles.modalHeader)}>
                    <h1>My Cart</h1>
                    <span
                        className={clsx(styles.btnCloseModal)}
                        onClick={() => dispatch(setCartList(false))}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </span>
                </div>
                <div className={clsx(styles.modalBody)}>
                    {
                        !cartStore || cartStore.length === 0 
                        ?
                        <div className={clsx(styles.noProductCase)}>
                            <i className={clsx("fa-solid fa-cart-shopping", styles.iconNoItemInCart)}></i>
                            <p className={clsx(styles.textNoItemInCart)}>No products in the cart.</p>
                            <button className={clsx(styles.btnReturnToShop)}
                                onClick={() => dispatch(setCartList(false))}
                            >Return to shop</button>
                        </div>
                        :
                        <>
                            <div className={clsx(styles.boxListItem)}>
                        <div className={clsx(styles.listItem)}>
                            {
                                cartStore.map((item, index) => {
                                    return (
                                        <ItemCart key={index} itemCart={item}/>
                                    )
                                })
                            }
                           
                            
                        </div>
                            </div>
                            <div className={clsx(styles.modalBodyControler)}>
                                <div className={clsx(styles.settingInfo)}>
                                    <div className={clsx(styles.boxListOption)}>
                                        <div className={clsx(styles.listOption)}>
                                            <div
                                                className={clsx(styles.itemOption)}
                                                onClick={() =>
                                                    setWindowNote(!windowNote)
                                                }
                                            >
                                                <span>
                                                    <i className="fa-regular fa-clipboard"></i>
                                                </span>
                                                <p>Note</p>
                                            </div>

                                            <div
                                                className={clsx(styles.itemOption)}
                                                onClick={() =>
                                                    setWindowShipping(!windowShipping)
                                                }
                                            >
                                                <span>
                                                    <i className="fa-solid fa-truck-fast"></i>
                                                </span>
                                                <p>Shipping</p>
                                            </div>
                                            <div
                                                className={clsx(styles.itemOption)}
                                                onClick={() =>
                                                    setWindowCoupon(!windowCoupon)
                                                }
                                            >
                                                <span>
                                                    <i className="fa-solid fa-percent"></i>
                                                </span>
                                                <p>Coupon</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.calcPrice)}>
                                        <div className={clsx(styles.priceBefore)}>
                                            <span>Subtotal</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                        {
                                            voucherSelected && 
                                            <div className={clsx(styles.coupon)}>
                                                <span>Coupon</span>
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
                                                    <p>-${
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
                                        }
                                        <div className={clsx(styles.isShipping)}>
                                            <span>Shipping</span>
                                            <span>{
                                                totalPrice >= process.env.REACT_APP_STANDARD_FREESHIPPING_COST 
                                                ? "Free Shipping" 
                                                : "Flat rate: " + process.env.REACT_APP_SHIPPING_FEE
                                            }</span>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.totalPrice)}>
                                        <div className={clsx(styles.reallyPay)}>
                                            <span>Total</span>
                                            <span>${getFinalTotalPriceOfCart(totalPrice, voucherSelected).toFixed(2)}</span>
                                        </div>
                                    </div>
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
                                            }</span> more to reach <span className={clsx(styles.fontWeightWithUppercase)}>FREE SHIPPING!</span></p>
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
                                </div>
                                <div className={clsx(styles.boxButton)}>
                                    <NavLink
                                        to={configs.routes.shoppingCart}
                                        className={clsx(
                                            styles.btnViewCart,
                                            styles.btnControl,
                                        )}
                                        onClick={() => dispatch(setCartList(false))}
                                    >
                                        View CART
                                    </NavLink>
                                    <NavLink
                                        to="/"
                                        className={clsx(
                                            styles.btnCheckout,
                                            styles.btnControl,
                                        )}
                                    >
                                        Checkout
                                    </NavLink>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div
                    className={clsx(
                        styles.layerModalNote,
                        !windowNote ? styles.unactive : '',
                    )}
                    onClick={() => {
                        setWindowNote(false);
                    }}
                ></div>
                <div
                    className={clsx(
                        styles.layerModalShipping,
                        !windowShipping ? styles.unactive : '',
                    )}
                    onClick={() => {
                        setWindowShipping(false);
                    }}
                ></div>
                <div
                    className={clsx(
                        styles.layerModalCoupon,
                        !windowCoupon ? styles.unactive : '',
                    )}
                    onClick={() => {
                        setWindowCoupon(false);
                    }}
                ></div>

                <div
                    className={clsx(
                        styles.addNote,
                        windowNote ? styles.active : '',
                    )}
                >
                    <p className={clsx(styles.btnCloseAddNote)}>
                        <span
                            onClick={() => {
                                setWindowNote(false);
                            }}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </p>
                    <p className={clsx(styles.addNoteTitle)}>Add note</p>
                    <textarea
                        name="titleAddNote"
                        id="titleAddNote"
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                    <button onClick={handleSaveNote}>SAVE</button>
                </div>
                <div
                    className={clsx(
                        styles.shipping,
                        windowShipping ? styles.active : '',
                    )}
                >
                    <div
                        className={clsx(styles.closeModalShipping)}
                        onClick={() => {
                            setWindowShipping(false);
                        }}
                    >
                        <span>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    <h1 className={clsx(styles.shippingTitle)}>
                        Estimate shipping rates
                    </h1>

                    <div className={clsx(styles.formInfoCheckout)}>
                        <select
                            name="nameCountry"
                            id="nameCountry"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            data-show-subtext="true"
                            data-live-search="true"
                            className={clsx(styles.inputShipping)}
                            
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

                        <input
                            type="text"
                            name="cityName"
                            className={clsx(styles.inputShipping)}
                            placeholder="City"
                            required
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            name="passcodeCity"
                            className={clsx(styles.inputShipping)}
                            placeholder="Passcode / ZIP"
                            required
                            value={passcode}
                            onChange={e => setPasscode(e.target.value)}
                        />

                        <button
                            className={clsx(styles.btnSubmitShipping)}
                            onClick={handleUpdateShipping}
                        >
                            UPDATE
                        </button>
                    </div>
                </div>
                <div
                    className={clsx(
                        styles.coupon,
                        windowCoupon ? styles.active : '',
                    )}
                >
                    <div className={clsx(styles.closeCouponModal)}>
                        <span onClick={() => setWindowCoupon(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    <h1 className={clsx(styles.couponTitle)}>
                        Select an available coupon
                    </h1>
                    <div className={clsx(styles.listCoupon)}>
                        {listCoupon.map((item, index) => {
                            return (
                                <div
                                    className={clsx(
                                        styles.itemCoupon,
                                        voucherSelected?._id === item._id
                                            ? styles.active
                                            : '',
                                    )}
                                    key={item._id}
                                    onClick={() => handleClickVoucher(item)}
                                >
                                    <p className={clsx(styles.valueCoupon)}>
                                        {item.discountType == 'money' || item.discountType == "ship fee"
                                            ? `$${item.discount}`
                                            : `${item.discount}%`}{' '}
                                        Discount
                                    </p>
                                    <div className={clsx(styles.couponInfo)}>
                                        <button>{item.code}</button>
                                        <span>
                                            {item.endDate === null
                                                ? 'Never Expire'
                                                : `${
                                                      monthNames[
                                                          item.endDate.getMonth()
                                                      ]
                                                  } ${item.endDate.getDay()} ${item.endDate.getFullYear()}`}
                                        </span>
                                    </div>
                                    <p className={clsx(styles.descriptCoupon)}>
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <h1 className={clsx(styles.couponTitle)}>
                        Have a coupon code?
                    </h1>
                    <input
                        type="text"
                        className={clsx(styles.inputVoucher)}
                        value={inputVoucher}
                        onChange={(e) => setInputVoucher(e.target.value)}
                    />

                    <button
                        className={styles.btnApplyCoupon}
                        onClick={handleUpdateCoupon}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
