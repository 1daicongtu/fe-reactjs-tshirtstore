
import { useEffect, useState } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from "../../redux/slices/headerStateSlice";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import clsx from "clsx";
import styles from "./stylesMyAccount.module.scss"
import TreePath from "../TreePath";
import configs from "../../config";

export const DASHBOARD = "Dashboard";
export const ORDERS = "Orders";
export const DOWNLOADS = "Downloads";
export const ADDRESSES = "Addresses";
export const ACCOUNT_DETAILS = "Account Details";
export const LOGOUT = "Logout";

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
  

export default function MyAccount({requireLogin}) {
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch();
    const {tab = DASHBOARD} = useParams();
    const navigate = useNavigate()
    
    const [tabActive, setTabActive] = useState(null);



    useEffect(()=>{
        setTabActive(tab);
        if (requireLogin && !userLogin.isLogin){
            
            dispatch(setLogin(true));
            navigate("/")
        }
    }, [])

    
    return (
        <div className={clsx(styles.myAccountWrapper)}>
            <TreePath
                title={tabActive === DASHBOARD ? "My Account" : tabActive}
                listPathTree={
                    tabActive === DASHBOARD
                    ?
                    [
                        {
                            name: "Home",
                            link: configs.routes.homePage
                        }
                    ]
                    :
                    [
                        {
                            name: "Home",
                            link: configs.routes.homePage
                        },
                        {
                            name: "My Account",
                            link: configs.routes.myAccount
                        }
                    ]
                }
            />
            <div className={clsx(styles.myAccountContainer)}>
                <div className={clsx(styles.myAccountRow, "row g-0")}>
                    <div className={clsx(styles.myAccountLeftCol, "col-12 col-md-3 col-lg-3")}>
                        <div className={clsx(styles.myAccountUserInfo)}>
                            <img
                                src="https://secure.gravatar.com/avatar/5e70ca5dcbfa9c7cf8c3b37236dcd616?s=60&d=mm&r=g"
                                alt="avatar"
                                className={clsx(styles.myAccountAvatar)}
                            />
                            <div>
                                <p className={clsx(styles.myAccountTitle)}>Welcome</p>
                                <p className={clsx(styles.myAccountNameUser)}>Hiếu Nguyễn</p>
                            </div>

                        </div>
                        <ul className={clsx(styles.tabsListMyAccount)}>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === DASHBOARD ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18H8ZM12 13C10.6193 13 9.5 11.8807 9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5C14.5 11.8807 13.3807 13 12 13Z"></path></svg>
                                <span>Dashboard</span>
                            </li>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === ORDERS ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg>
                                <span>Orders</span>
                            </li>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === DOWNLOADS ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM13 13H16L12 17L8 13H11V9H13V13Z"></path></svg>
                                <span>Downloads</span>
                            </li>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === ADDRESSES ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg> 
                                <span>Addresses</span>
                            </li>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === ACCOUNT_DETAILS ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"></path></svg>  
                                <span>Account details</span>
                            </li>
                            <li className={clsx(styles.tabsItemMyAccount, tabActive === LOGOUT ? styles.active : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
                                <span>Logout</span>
                            </li>
                            
                        </ul>

                    </div>
                    <div className={clsx(styles.myAccountRightCol, "col-12 col-md-9 col-lg-9")}>
                        {
                            tabActive === DASHBOARD
                            ?
                            <Dashboard setTabActive={setTabActive} user={userLogin}/>
                            :
                            tabActive === DOWNLOADS
                            ?
                            <Downloads/>
                            :
                            tabActive === ADDRESSES
                            ?
                            <Addresses/>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function Dashboard({setTabActive, user}){ 
   
    return (
        <div>
            <p className={clsx(styles.dashboardMainTitle)}>Hello <span className={clsx(styles.dashboardUserName)}>Hiếu Nguyễn Văn</span> {"("} not <span className={clsx(styles.dashboardUserName)}>{user.user.firstName} {user.user.lastName}</span>? <span className={clsx(styles.btnChooseNewTab)}>Log out</span> {")"}</p>
            <p className={clsx(styles.dashboardMainTitle)}>From your account dashboard you can view your <span className={clsx(styles.btnChooseNewTab)} onClick={()=>setTabActive(ORDERS)}>recent orders</span>, manage your <span className={clsx(styles.btnChooseNewTab)} onClick={()=> setTabActive(ADDRESSES)}>shipping and billing addresses</span>, and <span className={clsx(styles.btnChooseNewTab)} onClick={()=>setTabActive(ACCOUNT_DETAILS)} >edit your password and account details</span>.</p>
        
            <div className={clsx(styles.dashboardRow, "row g-0")}>
                <div className={clsx(styles.dashbaordCol, "col-6 col-md-4 col-lg-4")}>
                    <div className={clsx(styles.dashboardItem)}
                        onClick={()=>setTabActive(ORDERS)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg>
                        <p className={clsx(styles.dashboardItemTitle)}>Orders</p>
                    </div>
                </div>
                <div className={clsx(styles.dashbaordCol, "col-6 col-md-4 col-lg-4")}>
                    <div className={clsx(styles.dashboardItem)}
                        onClick={()=>setTabActive(DOWNLOADS)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM13 13H16L12 17L8 13H11V9H13V13Z"></path></svg>
                        <p className={clsx(styles.dashboardItemTitle)}>Downloads</p>
                    </div>
                </div>
                <div className={clsx(styles.dashbaordCol, "col-6 col-md-4 col-lg-4")}>
                    <div className={clsx(styles.dashboardItem)}
                        onClick={()=>setTabActive(ADDRESSES)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg> 
                        <p className={clsx(styles.dashboardItemTitle)}>Addresses</p>
                    </div>
                </div>
                <div className={clsx(styles.dashbaordCol, "col-6 col-md-4 col-lg-4")}>
                    <div className={clsx(styles.dashboardItem)}
                        onClick={()=>setTabActive(ACCOUNT_DETAILS)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"></path></svg>  
                        <p className={clsx(styles.dashboardItemTitle)}>Account details</p>
                    </div>
                </div>
                <div className={clsx(styles.dashbaordCol, "col-6 col-md-4 col-lg-4")}>
                    <div className={clsx(styles.dashboardItem)}
                        onClick={()=>setTabActive(LOGOUT)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
                        <p className={clsx(styles.dashboardItemTitle)}>Log out</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Downloads(){
    return (
        <div className={clsx(styles.boxDownload)}>
            <p className={clsx(styles.titleDownload)}>No downloads available yet.</p>
            <button className={clsx(styles.btnBrowseProduct)}>Browse Products</button>
        </div>
    )
}

function Addresses(){
    const infoCheckout = useSelector(state => state.infoCheckout);
    const { register, handleSubmit, formState: { errors, isValid}, watch, trigger, setValue} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    return (
        <div className={clsx(styles.addressWrapper)}>
            <p className={clsx(styles.titleAddress)}>The following addresses will be used on the checkout page by default.</p>
            <div className={clsx("row g-0", styles.rowAddress)}>
                <div className={clsx("col-6 col-md-6 col-lg-6", styles.colAddress)}>
                    <p className={clsx(styles.typeAddress)}>Billing Address</p>
                    <buttom className={clsx(styles.btnEditAddress)}>Edit</buttom>

                    <p className={clsx(styles.titleAddress)}>
                        Hiếu Nguyễn
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        No. 12 Nguyen Van Bao, Ward 4, Go Vap District, Ho Chi Minh City
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        Ho Chi Minh City, 700000
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        Vietnam
                    </p>
                </div>
                <div className={clsx("col-6 col-md-6 col-lg-6", styles.colAddress)}>
                    <p className={clsx(styles.typeAddress)}>Shipping Address</p>
                    <buttom className={clsx(styles.btnEditAddress)}>Edit</buttom>

                    <p className={clsx(styles.titleAddress)}>
                        Hiếu Nguyễn
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        No. 12 Nguyen Van Bao, Ward 4, Go Vap District, Ho Chi Minh City
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        Ho Chi Minh City, 700000
                    </p>
                    <p className={clsx(styles.titleAddress)}>
                        Vietnam
                    </p>
                </div>
                <div className={clsx("col-12 col-md-12 col-lg-12", styles.colAddress)}>
                    <p className={styles.typeAddress}>Billing address</p>
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

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
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

                        <div className={clsx("col-12 col-md-12 col-lg-12", styles.colShippingAdressForm)}>
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

                        <div className={clsx("col-12 col-md-6 col-lg-6", styles.colShippingAdressForm)}>
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
                        <div className={clsx("col-12 col-md-6 col-lg-6", styles.colShippingAdressForm)}>
                            <div className={clsx(styles.formGroupCheckOut)}>
                                <label className={clsx(styles.labelCheckOutForm, watch("email") ? styles.active : "")}
                                htmlFor="emailID"
                                >Email <span>*</span></label>

                                <input type="email" className={clsx(styles.inputCheckOutForm, watch("email") ? styles.active : "", errors.email ? styles.failed : "")} 
                                placeholder="Email *"
                                id="emailID"
                                {...register("email")}
                                />

                                {
                                errors.email
                                &&
                                <span className={clsx(styles.errMsgInputCheckout)}>{errors.email.message}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx("col-3 col-md-3 col-lg-3", styles.colAddress)}>
                    <button className={clsx(styles.btnSaveAddress)}>Save Address</button>
                </div>
               
            </div>
        </div>
    )
}