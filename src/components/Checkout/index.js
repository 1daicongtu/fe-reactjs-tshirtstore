import clsx from "clsx"
import styles from "./stylesCheckoutPage.module.scss"
import { Link } from "react-router-dom"
import configs from "../../config"
import Slider from "react-slick";
import { useEffect, useState } from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from "react-redux"
import { GetColorName } from "hex-color-to-color-name";
import { setVoucher, updateCart, updateCartItemToServer } from "../../redux/slices/cartSlice";
import calcTotalPriceOfCart from "../../utils/calcTotalPriceOfCart";
import getFinalTotalPriceOfCart from "../../utils/getFinalTotalPriceOfCart";
import { Tooltip } from 'react-tooltip';
import { addToastMessage } from "../HeaderComponent/ToastMessage";
import guarenteedSafeImg from "../../assets/trust_badge(1).png"
import { updateInfoCheckout } from "../../redux/slices/infoCheckoutSlice";


const INFORMATION = "information";
const SHIPPING = "shipping";
const PAYMENT = "payment";
const SAME = "same";
const DIFFERENT = "different";
const CHECK_PAYMENT = "Check payments";
const DIRECT_BANK_TRANSFER = "Direct bank transfer";
const CASH_ON_DELIVERY = "Cash on deliverys";
const PAYPAL = "PayPal";

const listPaymentMethod = [
  {
    id: 1, 
    name: CHECK_PAYMENT,
    img: null,
    desc: "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
  },
  {
    id: 2,
    name: DIRECT_BANK_TRANSFER,
    img: null,
    desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  }, 
  {
    id: 3,
    name: CASH_ON_DELIVERY,
    img: null,
    desc: "Pay with cash upon delivery.",
  },
  {
    id: 4,
    name: PAYPAL,
    img: "https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg",
    desc: "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.",
  }
]

const listReview = [
  {
    id: 1,
    username: "Anna",
    desc: "I will be shopping through you again in the very near future and will recommend you to everyone I know! Thank you again Super Happy :)",
    avatar: "https://elessi.b-cdn.net/wp-content/uploads/2020/06/checkout-avatar-2.png"
  },
  {
    id: 2,
    username: "Sammi",
    desc: "I love the clothes from this website!! Great service, Great clothes and FAST delivery!! Loved the dress, now buying more! Happy! Happy!",
    avatar: "https://elessi.b-cdn.net/wp-content/uploads/2020/06/checkout-avatar-1.png"
  }
]

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  country: yup.string().required(),
  streetAddress: yup.string().required(),
  passcode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().required(),
  companyName: yup.string()
})

export default function Checkout() {
  const cartStore = useSelector((state) => state.cart.cart)
  const userLogin = useSelector(state => state.userLogin)
  const listCoupon = useSelector(state => state.coupon.couponList)
  const dispatch = useDispatch()
  const [showInputVoucher, setShowInputVoucher] = useState(false);
  const [inputVoucher, setInputVoucher] = useState("");
  const voucherSelected = useSelector(state => state.cart.voucher);
  const [showOrderMobile, setShowOrderMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(INFORMATION);
  const infoCheckout = useSelector(state => state.infoCheckout);
  const [note, setNote] = useState("");
  const [usingAddress, setUsingAddress] = useState(SAME); 
  const [paymentMethod, setPaymentMethod] = useState(CHECK_PAYMENT);
  const [agreeTerm, setAgreeTerm] = useState(false);


  const settings = {
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      arrows: false,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
  };

  const { register, handleSubmit, formState: { errors, isValid}, watch, trigger, setValue} = useForm({
      mode: "onChange",
      resolver: yupResolver(schema)
  });

  

  function handleClickApplyCouponCode(){
    if(inputVoucher){
        const coupon = listCoupon.find(coupon => coupon.code.toUpperCase() === inputVoucher.toUpperCase());
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

  useEffect(()=>{
    setValue("email", infoCheckout.email);
    setValue("firstName", infoCheckout.firstname);
    setValue("lastName", infoCheckout.lastname);
    setValue("country", infoCheckout.country);
    setValue("streetAddress", infoCheckout.streetAddress);
    setValue("passcode", infoCheckout.passcode);
    setValue("companyName", infoCheckout.companyName);
    setValue("city", infoCheckout.city);
    setValue("phone", infoCheckout.phone);
    setNote("note")
  }, [])

  function handleClickCountinueToShipping(Type = SHIPPING){
    trigger();
    if (isValid){
      dispatch(updateInfoCheckout({
        email: watch("email"),
        firstname: watch("firstName"),
        lastname: watch("lastName"),
        country: watch("country"),
        streetAddress: watch("streetAddress"),
        passcode: watch("passcode"),
        companyName: watch("companyName"),
        city: watch("city"),
        phone: watch("phone"),
        note: infoCheckout.note
      }))
      setCurrentStep(Type);
    }
  }

  function handleClickToPaymentStep(){
    dispatch(updateInfoCheckout({
      ...infoCheckout,
      note: note
    }))
    setCurrentStep(PAYMENT);
  }

  return (
    <div className={clsx(styles.checkOutWrapper)}>
      <div className={clsx(styles.setBackgroundForPage)}>
        <div className={styles.backgroundForLeftSide}>

        </div>
        <div className={styles.backgroundForRightSide}>

        </div>
      </div>
      <div className={clsx(styles.checkOutContainer)}>
        <div className={clsx("row g-0", styles.rowCheckout)}>
          {
            currentStep === PAYMENT
            ?
            <div className={clsx("col-12 col-md-7 col-lg-7", styles.boxColCheckout)}>
              <div className={clsx(styles.leftColCheckout)}>
                <div className={clsx(styles.processPathTree)}>
                  <Link to={configs.routes.shoppingCart}
                   className={clsx(styles.pathItem)}
                  >
                    <span className={clsx(styles.pathItemName)}>Cart</span>
                  </Link>
                  <div
                   className={clsx(styles.pathItem, currentStep === INFORMATION ? styles.active : "")}
                   onClick={()=>{
                      trigger();
                      if (isValid){
                        setCurrentStep(INFORMATION);
                      }
                   }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>
                      Information
                    </span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === SHIPPING ? styles.active : "")}
                    onClick={()=>{
                      trigger();
                      if (isValid){
                        setCurrentStep(SHIPPING);
                      }
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Shipping</span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === PAYMENT ? styles.active : "")}
                    onClick={()=>{
                      trigger();
                      if (isValid){
                        setCurrentStep(PAYMENT);
                      }
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Payment</span>
                  </div>
                </div>

                <div className={clsx(styles.btnOpenOrderMobileBox)}
                  onClick={()=> setShowOrderMobile(true)}
                >
                  <div className={clsx(styles.btnOpenOrderMobileBoxLeft)}>
                    <i className="fa-regular fa-clipboard"></i>
                    <span className={clsx(styles.titleOrderMobile)}>Your Order</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div>
                    <span className={clsx(styles.totalPriceOfCart)}>${getFinalTotalPriceOfCart(calcTotalPriceOfCart(cartStore), voucherSelected).toFixed(2)}</span>
                  </div>
                </div> 
                <div>
                  <div className={clsx(styles.paymentInfoBox)}>
                    <div className={clsx(styles.shippingInfoItem, styles.borderBottomShippingItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Contact</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>{infoCheckout.email}</p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> {
                         
                          setCurrentStep(INFORMATION)
                        }}
                      >Change</button>
                    </div>
                    <div className={clsx(styles.shippingInfoItem, styles.borderBottomShippingItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Ship to</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>{infoCheckout.streetAddress},
                      , {infoCheckout.city}, {infoCheckout.passcode}, {infoCheckout.country}</p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> {
                          
                          setCurrentStep(INFORMATION)
                        }}
                      >Change</button>
                    </div>
                    <div className={clsx(styles.shippingInfoItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Method</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>
                        { calcTotalPriceOfCart(cartStore) >= 200 ? "Free Ship" : `Flat rate: $${process.env.REACT_APP_SHIPPING_FEE}`}
                      </p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> {
                          
                          setCurrentStep(INFORMATION)
                        }}
                      >Change</button>
                    </div>
                  </div>
                </div>

                <p className={clsx(styles.titleChekcOutForm)}>Billing address</p>
                <div className={clsx(styles.billingAddressBox)}>
                  <p className={clsx(styles.billingAddressDesc)}>Select the address that matches your card or payment method.</p>
                  <div className={clsx(styles.paymentInfoBox)}>
                    <div className={clsx(styles.shippingInfoItem, styles.borderBottomShippingItem)}>
                        <input
                          type="radio"
                          name="billingAddress"
                          checked={usingAddress === SAME}
                          onChange={()=> setUsingAddress(SAME)}
                          value={SAME}
                          className={clsx(styles.inputRadioBillingAddress)}
                        />
                        <p className={clsx(styles.shippingInfoItemValue)}>Same as shipping address</p>
                    </div>
                    <div className={clsx(styles.shippingInfoItem)}>
                        <input
                          type="radio"
                          name="billingAddress"
                          checked={usingAddress === DIFFERENT}
                          onChange={()=> setUsingAddress(DIFFERENT)}
                          value={DIFFERENT}
                          className={clsx(styles.inputRadioBillingAddress)}
                        />
                        <p className={clsx(styles.shippingInfoItemValue)}>Use a different billing address</p>
                      
                    </div>
                    <div className={clsx("row g-0", styles.rowShippingAdressForm, styles.formInBillingAddress, usingAddress === DIFFERENT ? styles.active : "")}> 
                        <div className={clsx("col-6 col-md-6 col-lg-6", styles.colShippingAdressForm)}>

                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("firstName") ? styles.active : "")}
                              htmlFor="firstName"
                            >First name <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm,  watch("firstName") ? styles.active : "", errors.firstName ? styles.failed : "")}
                              placeholder="First name *"
                              id="firstName"
                              {...register("firstName")}
                            />
                            {
                              errors.firstName
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.firstName.message}</span>
                            }
                          </div>

                        </div>

                        <div className={clsx("col-6 col-md-6 col-lg-6", styles.colShippingAdressForm)}>

                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("lastName") ? styles.active : "")}
                              htmlFor="lastName"
                            >Last name <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("lastName") ? styles.active : "", errors.lastName ? styles.failed : "")}
                              placeholder="Last name *"
                              id="lastName"
                              {...register("lastName")}
                            />
                            {
                              errors.lastName
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.lastName.message}</span>
                            }
                          </div>
                        </div>

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("companyName") ? styles.active : "")}
                              htmlFor="companyName"
                            >Company name (optional)</label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("companyName") ? styles.active : "", errors.companyName ? styles.failed : "")} 
                              placeholder="Company name"
                              id="companyName"
                              {...register("companyName")}
                            />
                          
                          </div>
                        </div>

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, styles.active)}
                              htmlFor="nameCountry"
                            >Country / Region <span>*</span></label>
                              <select
                                name="nameCountry"
                                id="nameCountry"
                                data-show-subtext="true"
                                data-live-search="true"
                                {...register("country")}
                                className={clsx(styles.inputCheckOutForm, styles.active)} 
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
                        </div>

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("streetAddress") ? styles.active : "")}
                              htmlFor="address"
                            >Street address <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("streetAddress") ? styles.active : "", errors.streetAddress ? styles.failed : "")} 
                              placeholder="Street address *"
                              id="address"
                              {...register("streetAddress")}
                            />
                            {
                              errors.streetAddress
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.streetAddress.message}</span>
                            }
                          </div>
                        </div>

                        <div className={clsx("col-6 col-md-4 col-lg-4", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("passcode") ? styles.active : "")}
                              htmlFor="passcodeID"
                            >Passcode / ZIP <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("passcode") ? styles.active : "", errors.passcode ? styles.failed : "")}
                              placeholder="Passcode / ZIP *"
                              id="passcodeID"
                              {...register("passcode")}
                            />
                            {
                              errors.passcode
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.passcode.message}</span>
                            }
                          </div>
                        </div>

                        <div className={clsx("col-6 col-md-4 col-lg-4", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("city") ? styles.active : "")}
                              htmlFor="townCityID"
                            >Town / City <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("city") ? styles.active : "", errors.city ? styles.failed : "")} 
                              placeholder="Town / City *"
                              id="townCityID"
                              {...register("city")}
                            />
                            {
                              errors.city
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.city.message}</span>
                            }
                          </div>
                        </div>

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                          <div className={clsx(styles.formGroupCheckOut)}>
                            <label className={clsx(styles.labelCheckOutForm, watch("phone") ? styles.active : "")}
                              htmlFor="phoneID"
                            >Phone <span>*</span></label>
                            <input type="text" className={clsx(styles.inputCheckOutForm, watch("phone") ? styles.active : "", errors.phone ? styles.failed : "")} 
                              placeholder="Phone *"
                              id="phoneID"
                              {...register("phone")}
                            />
                            {
                              errors.phone
                              &&
                              <span className={clsx(styles.errMsgInputCheckout)}>{errors.phone.message}</span>
                            }
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

                <p className={clsx(styles.titleChekcOutForm)}>Payment Methods</p>
                <div>
                  <p className={clsx(styles.billingAddressDesc)}>All transactions are secure and encrypted.</p>
                    <div className={clsx(styles.paymentInfoBox)}>
                      {
                        listPaymentMethod
                        &&
                        listPaymentMethod.map((itemPaymentMethod, index)=>{
                          return (
                            <div key={itemPaymentMethod.id} className={clsx(styles.paymentInfoItem, index == listPaymentMethod.length - 1 ?  styles.borderBottomShippingItem : "")}>
                              <div className={clsx(styles.paymentInfoItemContent)}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMethod === itemPaymentMethod.name}
                                    value={itemPaymentMethod.name}
                                    onChange={(e)=>setPaymentMethod(e.target.value)}
                                    className={clsx(styles.inputRadioBillingAddress)}
                                />
                                <p className={clsx(styles.paymentInfoItemValue)}>{itemPaymentMethod.name}</p>
                                {
                                  itemPaymentMethod.img
                                  &&
                                  <img
                                    src={itemPaymentMethod.img}
                                    alt="payment method"
                                  />
                                }
                              </div>
                              {
                                itemPaymentMethod.name == paymentMethod
                                &&
                                <p className={clsx(styles.paymentInfoItemDesc)}>
                                  {itemPaymentMethod.desc}
                                </p>
                              }
      
                            </div>
                          )
                        })
                      }
                    
                      
                    </div>
                  <p className={clsx(styles.paymentInfoPolicy)}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy
                  </p>

                  <div className={clsx(styles.boxAgreePolicy)}>
                    <input
                      type="checkbox"
                      className={clsx(styles.inputCheckboxPolicy)}
                      checked={agreeTerm}
                      onClick={()=> setAgreeTerm(!agreeTerm)}
                    />
                    <span className={clsx(styles.textCheckboxPolicy)}>I have read and agree to the website <a href="#">terms and conditions</a> *</span>
                  </div>
                  <button className={clsx(styles.btnPlaceOrder)}>
                    {
                      paymentMethod === PAYPAL
                      ?
                      "Proceed to Paypal"
                      :
                      "Place order"
                    }
                  </button>

                  <div className={clsx(styles.productGuarenteedSafe)}>
                    <p className={clsx(styles.productGuarenteedSafeTitle)}>
                        Guaranteed Safe Checkout
                    </p>
                    <img 
                      className={clsx(styles.productGuarenteedSafeImg)}
                      src={guarenteedSafeImg} alt="guarented img"
                    />
                  </div>

                  <Slider {...settings} className={clsx(styles.sliderReviewList)}>
                    {
                      listReview.map((item) => (
                        <div className={clsx(styles.itemReview)} key={item.id}>
                          <img
                            src={item.avatar}
                            alt="avatar"
                            className={clsx(styles.imgUsername)}
                          />
                          <div>
                            <p className={clsx(styles.reviewerUsername)}>{item.username}</p>
                            <p className={clsx(styles.reviewerDesc)}>{item.desc}</p>
                          </div>
                        </div>
                      ))
                    }
                  </Slider>
                </div>

              </div>
            </div>
            :
            currentStep === SHIPPING
            ?
            <div className={clsx("col-12 col-md-7 col-lg-7", styles.boxColCheckout)}>
              <div className={clsx(styles.leftColCheckout)}>
                <div className={clsx(styles.processPathTree)}>
                  <Link to={configs.routes.shoppingCart}
                   className={clsx(styles.pathItem)}
                  >
                    <span className={clsx(styles.pathItemName)}>Cart</span>
                  </Link>
                  <div
                   className={clsx(styles.pathItem, currentStep === INFORMATION ? styles.active : "")}
                   onClick={()=>{
                      trigger();
                      if (isValid) {
                        setCurrentStep(INFORMATION);
                      }
                   }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>
                      Information
                    </span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === SHIPPING ? styles.active : "")}
                    onClick={()=>{
                      trigger();
                      if (isValid) {
                        setCurrentStep(SHIPPING);
                      }
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Shipping</span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === PAYMENT ? styles.active : "")}
                    onClick={()=>{
                      trigger();
                      if (isValid) {
                        setCurrentStep(PAYMENT);
                      }
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Payment</span>
                  </div>
                </div>

                <div className={clsx(styles.btnOpenOrderMobileBox)}
                  onClick={()=> setShowOrderMobile(true)}
                >
                  <div className={clsx(styles.btnOpenOrderMobileBoxLeft)}>
                    <i className="fa-regular fa-clipboard"></i>
                    <span className={clsx(styles.titleOrderMobile)}>Your Order</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div>
                    <span className={clsx(styles.totalPriceOfCart)}>${getFinalTotalPriceOfCart(calcTotalPriceOfCart(cartStore), voucherSelected).toFixed(2)}</span>
                  </div>
                </div> 

                <div className={clsx(styles.shippingBox)}>
                  <div className={clsx(styles.shippingInfoBox)}>
                    <div className={clsx(styles.shippingInfoItem, styles.borderBottomShippingItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Contact</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>hieurio12@gmail.com
                      </p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> setCurrentStep(INFORMATION)}
                      >Change</button>
                    </div>
                    <div className={clsx(styles.shippingInfoItem, styles.borderBottomShippingItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Ship to</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>{infoCheckout.streetAddress},
                      , {infoCheckout.city}, {infoCheckout.passcode}, {infoCheckout.country}</p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> setCurrentStep(INFORMATION)}
                      >Change</button>
                    </div>
                    <div className={clsx(styles.shippingInfoItem)}>
                      <p className={clsx(styles.titleShippingInfo)}>Method</p>
                      <p className={clsx(styles.shippingInfoItemValue)}>
                        { calcTotalPriceOfCart(cartStore) >= 200 ? "Free Ship" : `Flat rate: $${process.env.REACT_APP_SHIPPING_FEE}`}
                      </p>
                      <button className={clsx(styles.btnChangeShippingInfo)}
                        onClick={()=> setCurrentStep(INFORMATION)}
                      >Change</button>
                    </div>

                  </div>
                  <p className={clsx(styles.titleChekcOutForm)}>Shipping Methods</p>
                  <div className={clsx(styles.shippingInfoBox)}>
                    <p className={clsx(styles.shippingInfoItemValue)}>{ calcTotalPriceOfCart(cartStore) >= 200 ? "Free Ship" : `Flat rate: $${process.env.REACT_APP_SHIPPING_FEE}`}</p>
                  </div>
                  <p className={clsx(styles.titleChekcOutForm)}>Order notes (optional)</p>
                  <textarea
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    rows={4}
                    className={clsx(styles.inputCheckOutForm)}
                    value={note}
                    onChange={(e)=> setNote(e.target.value)}
                  />
                  <div className={clsx(styles.boxBtnControlNavigation)}>
                    <button className={clsx(styles.btnReturnToCart)}
                      onClick={()=> setCurrentStep(INFORMATION)}
                    >
                      <i class="fa-solid fa-angle-left"></i>
                      <span>return to information</span>
                    </button>
                    <button
                      className={clsx(styles.btnCountinueToShipping)}
                      onClick={handleClickToPaymentStep}
                    >Countinue To Payment</button>
                  </div>
                </div>
              </div>
            </div> 
            :
            <div className={clsx("col-12 col-md-7 col-lg-7", styles.boxColCheckout)}>
              <div className={clsx(styles.leftColCheckout)}>
                <div className={clsx(styles.processPathTree)}>
                  <Link to={configs.routes.shoppingCart}
                   className={clsx(styles.pathItem)}
                  >
                    <span className={clsx(styles.pathItemName)}>Cart</span>
                  </Link>
                  <div
                   className={clsx(styles.pathItem, currentStep === INFORMATION ? styles.active : "")}
                   onClick={()=>{
                    handleClickCountinueToShipping(INFORMATION)
                   }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>
                      Information
                    </span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === SHIPPING ? styles.active : "")}
                    onClick={()=>{
                      handleClickCountinueToShipping(SHIPPING)
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Shipping</span>
                  </div>
                  <div
                   className={clsx(styles.pathItem, currentStep === PAYMENT ? styles.active : "")}
                    onClick={()=>{
                      handleClickCountinueToShipping(PAYMENT)
                    }}
                  >
                    <i class="fa-solid fa-angle-right"></i>
                    <span className={clsx(styles.pathItemName)}>Payment</span>
                  </div>
                </div>

                <div className={clsx(styles.btnOpenOrderMobileBox)}
                  onClick={()=> setShowOrderMobile(true)}
                >
                  <div className={clsx(styles.btnOpenOrderMobileBoxLeft)}>
                    <i className="fa-regular fa-clipboard"></i>
                    <span className={clsx(styles.titleOrderMobile)}>Your Order</span>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div>
                    <span className={clsx(styles.totalPriceOfCart)}>${getFinalTotalPriceOfCart(calcTotalPriceOfCart(cartStore), voucherSelected).toFixed(2)}</span>
                  </div>
                </div>

                <div className={clsx(styles.checkOutForm)}>
                  <p className={clsx(styles.titleChekcOutForm)}>Contact information</p>

                  <div className={clsx(styles.formGroupCheckOut)}>
                    <label className={clsx(styles.labelCheckOutForm,  watch("email") ? styles.active : "")}
                      htmlFor="emailAddress"
                    >Email address <span>*</span></label>
                    <input type="email" className={clsx(styles.inputCheckOutForm, watch("email") ? styles.active : "", errors.email ? styles.failed : "")} 
                      placeholder="Email address *"
                      id="emailAddress"
                      {...register("email")}
                    />
                    {
                      errors.email 
                      &&
                      <span className={clsx(styles.errMsgInputCheckout)}>{errors.email.message}</span>
                    }
                  </div>

                  <p className={clsx(styles.titleChekcOutForm)}>Shipping address</p>

                  <div className={clsx("row g-0", styles.rowShippingAdressForm)}> 
                    <div className={clsx("col-6 col-md-6 col-lg-6", styles.colShippingAdressForm)}>

                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("firstName") ? styles.active : "")}
                          htmlFor="firstName"
                        >First name <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm,  watch("firstName") ? styles.active : "", errors.firstName ? styles.failed : "")}
                          placeholder="First name *"
                          id="firstName"
                          {...register("firstName")}
                        />
                        {
                          errors.firstName
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.firstName.message}</span>
                        }
                      </div>

                    </div>

                    <div className={clsx("col-6 col-md-6 col-lg-6", styles.colShippingAdressForm)}>

                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("lastName") ? styles.active : "")}
                          htmlFor="lastName"
                        >Last name <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("lastName") ? styles.active : "", errors.lastName ? styles.failed : "")}
                          placeholder="Last name *"
                          id="lastName"
                          {...register("lastName")}
                        />
                        {
                          errors.lastName
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.lastName.message}</span>
                        }
                      </div>
                    </div>

                    <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("companyName") ? styles.active : "")}
                          htmlFor="companyName"
                        >Company name (optional)</label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("companyName") ? styles.active : "", errors.companyName ? styles.failed : "")} 
                          placeholder="Company name"
                          id="companyName"
                          {...register("companyName")}
                        />
                       
                      </div>
                    </div>

                    <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, styles.active)}
                          htmlFor="nameCountry"
                        >Country / Region <span>*</span></label>
                          <select
                            name="nameCountry"
                            id="nameCountry"
                            data-show-subtext="true"
                            data-live-search="true"
                            {...register("country")}
                            className={clsx(styles.inputCheckOutForm, styles.active)} 
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
                    </div>

                    <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("streetAddress") ? styles.active : "")}
                          htmlFor="address"
                        >Street address <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("streetAddress") ? styles.active : "", errors.streetAddress ? styles.failed : "")} 
                          placeholder="Street address *"
                          id="address"
                          {...register("streetAddress")}
                        />
                        {
                          errors.streetAddress
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.streetAddress.message}</span>
                        }
                      </div>
                    </div>

                    <div className={clsx("col-6 col-md-4 col-lg-4", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("passcode") ? styles.active : "")}
                          htmlFor="passcodeID"
                        >Passcode / ZIP <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("passcode") ? styles.active : "", errors.passcode ? styles.failed : "")}
                          placeholder="Passcode / ZIP *"
                          id="passcodeID"
                          {...register("passcode")}
                        />
                        {
                          errors.passcode
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.passcode.message}</span>
                        }
                      </div>
                    </div>

                    <div className={clsx("col-6 col-md-4 col-lg-4", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("city") ? styles.active : "")}
                          htmlFor="townCityID"
                        >Town / City <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("city") ? styles.active : "", errors.city ? styles.failed : "")} 
                          placeholder="Town / City *"
                          id="townCityID"
                          {...register("city")}
                        />
                        {
                          errors.city
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.city.message}</span>
                        }
                      </div>
                    </div>

                    <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
                      <div className={clsx(styles.formGroupCheckOut)}>
                        <label className={clsx(styles.labelCheckOutForm, watch("phone") ? styles.active : "")}
                          htmlFor="phoneID"
                        >Phone <span>*</span></label>
                        <input type="text" className={clsx(styles.inputCheckOutForm, watch("phone") ? styles.active : "", errors.phone ? styles.failed : "")} 
                          placeholder="Phone *"
                          id="phoneID"
                          {...register("phone")}
                        />
                        {
                          errors.phone
                          &&
                          <span className={clsx(styles.errMsgInputCheckout)}>{errors.phone.message}</span>
                        }
                      </div>
                    </div>
                  </div>

                </div>

                <div className={clsx(styles.boxBtnControlNavigation)}>
                  <Link to={configs.routes.shoppingCart} className={clsx(styles.btnReturnToCart)}>
                    <i class="fa-solid fa-angle-left"></i>
                    <span>return to cart</span>
                  </Link>
                  <button
                    className={clsx(styles.btnCountinueToShipping)}
                    onClick={()=>{
                      handleClickCountinueToShipping(SHIPPING)
                    }}
                  >Countinue To Shipping</button>
                </div>
                   
                <p className={clsx(styles.titleChekcOutForm, styles.whatTheySay)}>What they are saying</p>
                <Slider {...settings} className={clsx(styles.sliderReviewList)}>
                    {
                      listReview.map((item) => (
                        <div className={clsx(styles.itemReview)} key={item.id}>
                          <img
                            src={item.avatar}
                            alt="avatar"
                            className={clsx(styles.imgUsername)}
                          />
                          <div>
                            <p className={clsx(styles.reviewerUsername)}>{item.username}</p>
                            <p className={clsx(styles.reviewerDesc)}>{item.desc}</p>
                          </div>
                        </div>
                      ))
                    }
                </Slider>
              </div>
            </div> 
          }
          
          
          

          <div className={clsx("col-12 col-md-5 col-lg-5", styles.boxColCheckout, styles.rightBoxColCheckout)}>
            <div className={clsx(styles.rightColCheckout)}>
              <div className={clsx(styles.productListInCart)}>
                {
                  cartStore
                  &&
                  cartStore.map((item) =>{
                    return (
                      <div className={clsx(styles.productItemInCart)} key={item.id}>
                        <div className={clsx(styles.productInfoBox)}>
                            <div className={clsx(styles.productImageBox)}>
                              <img
                                src={item.productDetailSelected?.imageSmall?.front}
                                alt="product"
                                className={clsx(styles.productImage)}
                              />
                              <span className={clsx(styles.quantityProductInCart)}>{item.quantity}</span>
                            </div>
                            <div>
                              <p className={clsx(styles.productNameInCart)}>{item.productName}</p>
                              <p className={clsx(styles.productPriceInCart)}>{item.productDetailSelected?.typeName} / {GetColorName(item.colorSelected)}/ {item.sizeSelected}</p>
                              <div className={clsx(styles.boxChangeQuantityProduct)}>
                                <button className={clsx(styles.btnChangeQuantityProduct, styles.btnDecreaseQuantityProduct)}
                                  onClick={()=>{
                                      if (item.quantity === 1) return
                                      if (userLogin.isLogin){
                                        dispatch(updateCartItemToServer({
                                          userID: userLogin.user?._id,
                                          productID: item.productID,
                                          sizeSelected: item.sizeSelected,
                                          colorSelected: item.colorSelected,
                                          productDetailSelected: item.productDetailSelected,
                                          quantity: item.quantity - 1
                                        }))
                                      } else {
                                        dispatch(updateCart({
                                          productID: item.productID,
                                          sizeSelected: item.sizeSelected,
                                          colorSelected: item.colorSelected,
                                          productDetailSelected: item.productDetailSelected,
                                          quantity: item.quantity - 1
                                        }))
                                      }
                                  }}
                                >
                                  <i class="fa-solid fa-minus"></i>
                                </button>
                                <input type="text" className={clsx(styles.inputQuantityProduct)} value={item.quantity} />
                                <button className={clsx(styles.btnChangeQuantityProduct, styles.btnIncreaseQuantityProduct)}
                                  onClick={()=>{
                                    if (userLogin.isLogin){
                                      dispatch(updateCartItemToServer({
                                        userID: userLogin.user?._id,
                                        productID: item.productID,
                                        sizeSelected: item.sizeSelected,
                                        colorSelected: item.colorSelected,
                                        productDetailSelected: item.productDetailSelected,
                                        quantity: item.quantity + 1
                                      }))
                                    } else {
                                      dispatch(updateCart({
                                        productID: item.productID,
                                        sizeSelected: item.sizeSelected,
                                        colorSelected: item.colorSelected,
                                        productDetailSelected: item.productDetailSelected,
                                        quantity: item.quantity + 1
                                      }))
                                    }
                                  }}
                                >
                                  <i class="fa-solid fa-plus"></i>
                                </button>
                              </div>
                            </div>
                        </div>
                        <div>
                          <p className={clsx(styles.subTotalOfEachProduct)}>${(item.productDetailSelected?.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })
                }
                
              </div>
              <div className={clsx(styles.boxAppCouponCode)}>
                  <div className={clsx(styles.boxToggleFormGroupCoupon)}>
                    <button className={clsx(styles.btnToggleCouponForm)}
                      onClick={()=>{
                        setShowInputVoucher(!showInputVoucher)
                      }}
                    >
                      <i className="fa-solid fa-tag"></i>
                      Have a coupon code?
                    </button>
                    <button className={clsx(styles.btnToggleCouponForm)}
                      onClick={()=>{
                        setShowInputVoucher(!showInputVoucher)
                      }}
                    >
                      {showInputVoucher ? "Close" : "Add"}
                    </button>
                  </div>
                  {
                    showInputVoucher
                    &&
                    <div className={clsx(styles.boxInputCouponCode)}>
                      <input type="text" className={clsx(styles.inputCouponCode)} placeholder="Coupon code" 
                        value={inputVoucher}
                        onChange={(e)=>{
                          setInputVoucher(e.target.value)
                        }}
                      />
                      <button className={clsx(styles.btnApplyCoupon)}
                        onClick={handleClickApplyCouponCode}
                      >Apply</button>
                    </div>
                  }
              </div>
              <div className={clsx(styles.totalPriceInfoBox)}>
                <div className={clsx(styles.boxSubTotalAndShipping)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitle)}>Subtotal</span>
                  <span className={clsx(styles.boxSubTotalAndShippingValue)}>${calcTotalPriceOfCart(cartStore).toFixed(2)}</span>
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
                                        <p className={clsx(styles.boxSubTotalAndShippingValue)}>-${
                                            voucherSelected.discountType == "percent" 
                                            ? (calcTotalPriceOfCart(cartStore) * voucherSelected.discount / 100).toFixed(2) 
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
                <div className={clsx(styles.boxSubTotalAndShipping)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitle)}>Shipping</span>
                 
                  <span className={clsx(styles.boxSubTotalAndShippingValue)}>{
                    calcTotalPriceOfCart(cartStore) >= 200 ? "Free Ship" : `Flat rate: $${process.env.REACT_APP_SHIPPING_FEE}`
                  }</span>
                </div>
                <div className={clsx(styles.boxSubTotalAndShippingFinal)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitleFinal)}>Total</span>
                  <span className={clsx(styles.boxSubTotalAndShippingValueFinal)}>${getFinalTotalPriceOfCart(calcTotalPriceOfCart(cartStore), voucherSelected).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.mobileRightColCheckout, showOrderMobile ? styles.active : "")}>
              <div className={clsx(styles.controlCloseModelOrder)}>
                <p className={clsx(styles.titleControlCloseModelOrder)}>YOUR ORDER</p>
                <button className={clsx(styles.btnControlCloseModelOrder)}
                  onClick={()=>{setShowOrderMobile(false)}}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className={clsx(styles.productListInCart)}>
                {
                  cartStore
                  &&
                  cartStore.map((item) =>{
                    return (
                      <div className={clsx(styles.productItemInCart)} key={item.id}>
                        <div className={clsx(styles.productInfoBox)}>
                            <div className={clsx(styles.productImageBox)}>
                              <img
                                src={item.productDetailSelected?.imageSmall?.front}
                                alt="product"
                                className={clsx(styles.productImage)}
                              />
                              <span className={clsx(styles.quantityProductInCart)}>{item.quantity}</span>
                            </div>
                            <div>
                              <p className={clsx(styles.productNameInCart)}>{item.productName}</p>
                              <p className={clsx(styles.productPriceInCart)}>{item.productDetailSelected?.typeName} / {GetColorName(item.colorSelected)}/ {item.sizeSelected}</p>
                              <div className={clsx(styles.boxChangeQuantityProduct)}>
                                <button className={clsx(styles.btnChangeQuantityProduct, styles.btnDecreaseQuantityProduct)}
                                  onClick={()=>{
                                      if (item.quantity === 1) return
                                      if (userLogin.isLogin){
                                        dispatch(updateCartItemToServer({
                                          userID: userLogin.user?._id,
                                          productID: item.productID,
                                          sizeSelected: item.sizeSelected,
                                          colorSelected: item.colorSelected,
                                          productDetailSelected: item.productDetailSelected,
                                          quantity: item.quantity - 1
                                        }))
                                      } else {
                                        dispatch(updateCart({
                                          productID: item.productID,
                                          sizeSelected: item.sizeSelected,
                                          colorSelected: item.colorSelected,
                                          productDetailSelected: item.productDetailSelected,
                                          quantity: item.quantity - 1
                                        }))
                                      }
                                  }}
                                >
                                  <i class="fa-solid fa-minus"></i>
                                </button>
                                <input type="text" className={clsx(styles.inputQuantityProduct)} value={item.quantity} />
                                <button className={clsx(styles.btnChangeQuantityProduct, styles.btnIncreaseQuantityProduct)}
                                  onClick={()=>{
                                    if (userLogin.isLogin){
                                      dispatch(updateCartItemToServer({
                                        userID: userLogin.user?._id,
                                        productID: item.productID,
                                        sizeSelected: item.sizeSelected,
                                        colorSelected: item.colorSelected,
                                        productDetailSelected: item.productDetailSelected,
                                        quantity: item.quantity + 1
                                      }))
                                    } else {
                                      dispatch(updateCart({
                                        productID: item.productID,
                                        sizeSelected: item.sizeSelected,
                                        colorSelected: item.colorSelected,
                                        productDetailSelected: item.productDetailSelected,
                                        quantity: item.quantity + 1
                                      }))
                                    }
                                  }}
                                >
                                  <i class="fa-solid fa-plus"></i>
                                </button>
                              </div>
                            </div>
                        </div>
                        <div>
                          <p className={clsx(styles.subTotalOfEachProduct)}>${(item.productDetailSelected?.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })
                }
                
              </div>
              <div className={clsx(styles.boxAppCouponCode)}>
                  <div className={clsx(styles.boxToggleFormGroupCoupon)}>
                    <button className={clsx(styles.btnToggleCouponForm)}
                      onClick={()=>{
                        setShowInputVoucher(!showInputVoucher)
                      }}
                    >
                      <i className="fa-solid fa-tag"></i>
                      Have a coupon code?
                    </button>
                    <button className={clsx(styles.btnToggleCouponForm)}
                      onClick={()=>{
                        setShowInputVoucher(!showInputVoucher)
                      }}
                    >
                      {showInputVoucher ? "Close" : "Add"}
                    </button>
                  </div>
                  {
                    showInputVoucher
                    &&
                    <div className={clsx(styles.boxInputCouponCode)}>
                      <input type="text" className={clsx(styles.inputCouponCode)} placeholder="Coupon code" 
                        value={inputVoucher}
                        onChange={(e)=>{
                          setInputVoucher(e.target.value)
                        }}
                      />
                      <button className={clsx(styles.btnApplyCoupon)}
                        onClick={handleClickApplyCouponCode}
                      >Apply</button>
                    </div>
                  }
              </div>
              <div className={clsx(styles.totalPriceInfoBox)}>
                <div className={clsx(styles.boxSubTotalAndShipping)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitle)}>Subtotal</span>
                  <span className={clsx(styles.boxSubTotalAndShippingValue)}>${calcTotalPriceOfCart(cartStore).toFixed(2)}</span>
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
                                        <p className={clsx(styles.boxSubTotalAndShippingValue)}>-${
                                            voucherSelected.discountType == "percent" 
                                            ? (calcTotalPriceOfCart(cartStore) * voucherSelected.discount / 100).toFixed(2) 
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
                <div className={clsx(styles.boxSubTotalAndShipping)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitle)}>Shipping</span>
                 
                  <span className={clsx(styles.boxSubTotalAndShippingValue)}>{
                    calcTotalPriceOfCart(cartStore) >= 200 ? "Free Ship" : `Flat rate: $${process.env.REACT_APP_SHIPPING_FEE}`
                  }</span>
                </div>
                <div className={clsx(styles.boxSubTotalAndShippingFinal)}>
                  <span className={clsx(styles.boxSubTotalAndShippingTitleFinal)}>Total</span>
                  <span className={clsx(styles.boxSubTotalAndShippingValueFinal)}>${getFinalTotalPriceOfCart(calcTotalPriceOfCart(cartStore), voucherSelected).toFixed(2)}</span>
                </div>
              </div>
      </div>
    </div>
  )
}
