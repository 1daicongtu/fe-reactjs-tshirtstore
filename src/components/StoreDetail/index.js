import clsx from 'clsx';
import styles from './styleStoreDetail.module.scss';
import ItemProduct from '../ItemProduct';
import {useParams} from "react-router-dom"
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";

const GRID3 = "GRID3"
const GRID4 = "GRID4"

export default function StoreDetail() {
    const {id} = useParams();
    const stores = useSelector(state => state.stores.listStore)
    const productsList = useSelector(state => state.products.listProduct)
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState(GRID4);
    const [inputSearchProduct, setInputSearchProduct] = useState("");
    const [openCegegories, setOpenCegegories] = useState(true);
    const [openWorkTime, setOpenWorkTime] = useState(true);
    const [openContactVendor, setOpenContactVendor] = useState(true);
    const [openSlideLeft, setOpenSlideLeft] = useState(false);
    
    useEffect(()=>{
        if (stores && stores.length > 0){
            const data = stores.filter((v, k)=>{
                return v.idStore == id;
            })
            if (data.length > 0){
                setStore(data[0]);
                const newProducts = productsList.filter((v, k)=> v.storeID == id);
                setProducts(newProducts);
            }
        }
    }, [id, stores])

    const handleFilterProductOfStore = ()=>{
        if (inputSearchProduct){
            const newProducts = productsList.filter((v, k)=> v.storeID == 
            id && v.productName.toLowerCase().includes(inputSearchProduct.toLowerCase()));
            setProducts(newProducts);
        }else{
            const newProducts = productsList.filter((v, k)=> v.storeID == id);
            setProducts(newProducts);
        }
    }
    const checkStoreIsClosed = (schedule)=>{
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const d = new Date();
        let day = weekday[d.getDay()];

        const datNow = schedule.find(item => item.dayOfWeek == day)
        const hours = d.getHours();
        const minutes = d.getMinutes();
    
        let hoursOpen = parseInt(datNow.openTime.split(':')[0]);
        let minutesOpen = parseInt(datNow.openTime.split(':')[1].slice(0,2));
        if (datNow.openTime.split(':')[1].slice(2,4) === 'PM' && hoursOpen !== 12) hoursOpen += 12;
       
        let hoursClose = parseInt(datNow.closeTime.split(':')[0]);
        let minutesClose = parseInt(datNow.closeTime.split(':')[1].slice(0,2));
        if (datNow.closeTime.split(':')[1].slice(2,4) === 'PM' && hoursClose !== 12) hoursClose += 12;


        if (hours < hoursOpen || hours > hoursClose) {
            return true;
        } else if (hours === hoursOpen && minutes < minutesOpen) {
            return true;
        } else if (hours === hoursClose && minutes > minutesClose) {
          return true;
        }
        return false;
    }

    return (

            store 
            ?
            <div className={clsx(styles.storeDetailWrapper)}>
                <button className={clsx(styles.btnOpenLeftSide)}
                    onClick={()=>setOpenSlideLeft(true)}
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div className={clsx("row", styles.storeDetailRow)}>
                    <div className={clsx( "col-10 col-md-6 col-lg-3", styles.boxStoreDetailRowLeft, openSlideLeft ? styles.active :"")}>
                        <button className={clsx(styles.btnCloseSideLeft)}
                            onClick={()=>setOpenSlideLeft(false)}
                        >
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className={clsx(styles.storeDetailRowLeft)}>
                            <div className={clsx(styles.storeDatailLeftCategories)}>
                                <div className={clsx(styles.categoriesWrapperHeader)}>   
                                    <p className={clsx(styles.categoriesName)}>Categories</p>
                                    <button className={clsx(styles.categoryBoxControl)}
                                        onClick={()=>setOpenCegegories(!openCegegories)}
                                    >
                                        <i className={clsx("fa-solid fa-minus", styles.btnOpenCategory, !openCegegories ? styles.closed : "")}></i>

                                        <i className={clsx("fa-solid fa-minus", styles.btnCloseCategory)}></i>
                                    </button>
                                </div>
                                <div className={clsx(styles.tempCategory, openCegegories ? styles.active : "")}></div>
                                <div>
                                    <ul className={clsx(styles.listCategory, openCegegories ? styles.open : "")}>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Outerwear
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Sweaters
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Sweaters & Hoodies
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Coats and jackets
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Puffers jackets
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Dress
                                            </a>
                                        </li>
                                        <li>
                                            <div className={clsx(styles.circleCategoryItem)}></div>
                                            <a href="#" className={clsx(styles.itemCategory)}>
                                                Women
                                            </a>
                                        </li>
                                    
                                    </ul>
                                </div>
                            </div>
                            <div className={clsx(styles.storeDatailLeftWorkTime)}>
                                <div className={clsx(styles.workTimeWrapperHeader)}>   
                                    <p className={clsx(styles.workTimeName)}>Work Time</p>
                                    <button className={clsx(styles.workTimeBoxControl)}
                                        onClick={()=>{setOpenWorkTime(!openWorkTime)}}
                                    >
                                        <i className={clsx("fa-solid fa-minus", styles.btnOpenWorkTime, !openWorkTime ? styles.closed : "")}></i>

                                        <i className={clsx("fa-solid fa-minus", styles.btnCloseWorkTime)}></i>
                                    </button>
                                </div>
                                <div className={clsx(styles.tempCategory, openCegegories ? styles.active : "")}></div>
                                <div>
                                    <ul className={clsx(styles.listSchedule, openWorkTime ? styles.open : "")}>
                                        {
                                            store && store.schedule && store.schedule.length > 0 &&
                                            store.schedule.map((v, k)=>{
                                                return (
                                                    <li className={clsx(styles.itemSchedule)} key={k}>
                                                        <p className={clsx(styles.scheduleDayOfWeek)}>{v.dayOfWeek}</p>
                                                        <p className={clsx(styles.scheduleWorkingTime)}>:  {v.openTime} - {v.closeTime}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    
                                    </ul>
                                </div>
                            </div>
                            <div className={clsx(styles.storeDatailLeftWorkTime)}>
                                <div className={clsx(styles.workTimeWrapperHeader)}>   
                                    <p className={clsx(styles.workTimeName)}>Contact Vendor</p>
                                    <button className={clsx(styles.workTimeBoxControl)}
                                        onClick={()=>{setOpenContactVendor(!openContactVendor)}}
                                    >
                                        <i className={clsx("fa-solid fa-minus", styles.btnOpenWorkTime, !openContactVendor ? styles.closed : "")}></i>

                                        <i className={clsx("fa-solid fa-minus", styles.btnCloseWorkTime)}></i>
                                    </button>
                                </div>
                                <div className={clsx(styles.tempCategory, openContactVendor ? styles.active : "")}></div>
                                <div className={clsx(styles.listVendorProduct, openContactVendor ? styles.open : "")}>
                                    <form method='post' action='#'>
                                        <input
                                            type='text'
                                            placeholder='Your Name'
                                            className={clsx(styles.inputContactVendor)}
                                        />
                                        <input
                                            type='email'
                                            placeholder='you@example.com'
                                            className={clsx(styles.inputContactVendor)}
                                        />
                                        <textarea
                                            placeholder='Type your message...'
                                            rows={5}
                                            className={clsx(styles.inputContactVendor)}
                                        />
                                        <button className={clsx(styles.btnSendContactVendor)} type='submit'>Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.storeDetailRowRight, "col-12 col-md-12 col-lg-9")}>
                        <div className={clsx(styles.storeDetailRowRightBox)}>
                            <img
                                className={clsx(styles.storeImgBackground)}
                                src={store.backgroudURL}
                            />
                            <div className={clsx(styles.storeDetailRowRightStoreInfo)}>
                                <div className={clsx(styles.storeDetailStoreAvtAndName)}>
                                    <img
                                        src={store.logoURL}
                                    />
                                    <p className={clsx(styles.storeDetailStoreName)}>{store.storeName}</p>
                                </div>
                                <div className={clsx(styles.storeBoxInfoDesp)}>
                                    <i class="fa-solid fa-location-dot"></i>    
                                    <span>{store.address}</span>
                                </div>
                                <div className={clsx(styles.storeBoxInfoDesp)}>
                                    <i class="fa-solid fa-mobile-screen-button"></i>
                                    <span>{store.tel}</span>
                                </div>
                                <div className={clsx(styles.storeBoxInfoDesp)}>
                                    <i class="fa-solid fa-envelope"></i>
                                    <span>{store.email}</span>
                                </div>
                                <div className={clsx(styles.storeBoxInfoDesp)}>
                                    <i class="fa-solid fa-star"></i>
                                    <span>{store.rating} rating from {store.reviewCount} review</span>
                                </div>
                                <div className={clsx(styles.storeBoxInfoDesp)}>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    <span>{checkStoreIsClosed(store.schedule) ? "Open Store" : "Closed Store"}</span>
                                </div>
                            </div>
                            <div className={clsx(styles.boxSocialNetwork)}>
                                <a href={store.social?.fb}>
                                    <i class="fa-brands fa-square-facebook" style={{color: "#3B5998"}}></i>
                                </a>
                                <a href={store.social?.tw}>
                                    <i class="fa-brands fa-square-twitter" style={{color: "#55ACEE"}}></i>
                                </a>
                                <a href={store.social?.pr}>
                                    <i class="fa-brands fa-square-pinterest" style={{color: "#BD081C"}}></i>
                                </a>
                                <a href={store.social?.ig}>
                                    <i class="fa-brands fa-instagram" style={{color: "#125688"}}></i>
                                </a>
                            </div>
                        </div>
                        <div className={clsx(styles.storeDetailFilterAndControlLayoutWrapper)}>
                            <div className={clsx(styles.filterProductOfStoreWrapper)}>
                                <input
                                    className={clsx(styles.inputFilterProductOfStore)}
                                    placeholder='Enter product name'
                                    value={inputSearchProduct}
                                    onChange={(e)=>setInputSearchProduct(e.target.value)}
                                />
                                <button className={clsx(styles.btnFilterProductOfStore)}
                                    onClick={handleFilterProductOfStore}
                                >Search</button>
                            </div>
                            <div>
                            
                                <button className={clsx(styles.btnChangeProductLayout, layout == GRID4 ? styles.active : "")}
                                    onClick={()=>setLayout(GRID4)}
                                >
                                    <i class="fa-solid fa-table-cells-large"></i>
                                </button>
                                <button className={clsx(styles.btnChangeProductLayout, layout == GRID3 ? styles.active : "")}
                                    onClick={()=>setLayout(GRID3)}
                                >
                                    <i class="fa-regular fa-square"></i>
                                </button>
                                
                            </div>
                        
                        </div>
                        <div>
                            {
                                GRID4 == layout
                                &&
                                <div className={clsx("row g-0 mt-5", styles.gridLayout4)}>
                                    {
                                        products && products.map((product, index)=>{
                                            return (
                                                <div class="col-6 col-md-6 col-lg-3" key={index}>
                                                    <ItemProduct product={product} />
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                            }
                            {
                                GRID3 == layout
                                &&
                                <div className={clsx("row g-0 mt-5", styles.gridLayout4)}>
                                    {
                                        products && products.map((product, index)=>{
                                            return (
                                                <div class="col-6 col-md-6 col-lg-4" key={index}>
                                                    <ItemProduct product={product} />
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                            }
                        
                        </div>
                    </div>
                </div>
                <div className={clsx(openSlideLeft ? styles.layoutForLeftSide : "")}
                    onClick={()=>setOpenSlideLeft(false)}
                >

                </div>
            </div>
            :
            <div></div>
    )
}
