
import Header from '../HeaderComponent/Header'
import Footer from '../FooterComponent'
import clsx from 'clsx';
import styles from './styleStore.module.scss';
import Slider from "react-slick";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setProductToShow, setShowPopup } from '../../redux/slices/popupQuickViewProduct';
import { doc } from 'prettier';
import { store } from '../../redux/store';


export const NEWEST = "newest";
export const POPULAR = "popular";
export const RANDOM = "random";

const GRID = "grid";
const LIST = "list";

export default function Store() {
    const [layout, settingLayout] = useState(GRID);
    const [filterToggle, setFilterToggle] = useState(false);
    const sliderBestSellingRef = useRef();
    const sliderFeaturedRef = useRef();
    const sliderTopRatedRef = useRef();
    const [indexBestSelling, setIndexBestSelling] = useState(0);
    const [indexFeatured, setIndexFeatured] = useState(0);
    const [indexTopRated, setIndexTopRated] = useState(0);
    const products = useSelector(state => state.products.listProduct)
    const dispatch = useDispatch();
    const stores = useSelector(state => state.stores.listStore);
    const [storesData, setStoresData] = useState(stores);
    const [inputSearch, setInputSearch] = useState("");


    useEffect(()=>{
        const handleResizeWindow = () => {
          
            if (window.innerWidth <= 992 && layout == LIST) {
                settingLayout(GRID);
            }
        }
        window.addEventListener('resize', handleResizeWindow);

    
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    
    }, [stores])

    
    useEffect(()=>{
        setStoresData(stores);
    }, [stores])

    // setting banners
    const settings = {
       
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    // settings for best selling
    const settingsBestSelling = {
        speed: 700,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        rows: 3,
        infinite: false,
        afterChange: (index) => {
            setIndexBestSelling(index);
        }
    }
    const settingsFeatured = {
        speed: 700,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        rows: 3,
        infinite: false,
        afterChange: (index) => {
            setIndexFeatured(index);
        }
    }
    const settingsTopRated = {
        speed: 700,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        rows: 3,
        infinite: false,
        afterChange: (index) => {
            setIndexTopRated(index);
        }
    }

    const handleOpenQuickView = (e, product) => {
        e.preventDefault();
        dispatch(setProductToShow(product));
        dispatch(setShowPopup(true));
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
    const handleFilterStore = ()=>{
        if (!inputSearch) return setStoresData(stores);
        const storesFilter = stores.filter(store => store.storeName.toLowerCase().includes(inputSearch.toLowerCase()));
        setStoresData(storesFilter);
        setFilterToggle(false);
    }

    return (
        <div>
            <Slider {...settings}>
                <div className={clsx(styles.boxItemBanner)}>
                    <img src={require("../../assets/dokan-banner54.jpg")}/>
                    <div className={clsx(styles.boxItemContentWrapperLeft, "boxContentStoreLeft")}>
                        <p className={clsx(styles.boxVendorShop)}>VENDOR SHOP</p>
                        <p className={clsx(styles.boxItemDesc)}>Easy to <br/> start selling online</p>
                        <a href="#" className={clsx(styles.btnStartSelling)}>Start Selling</a>
                    </div>
                </div>
                <div className={clsx(styles.boxItemBanner)}>
                    <img src={require("../../assets/dokan-banner58.jpg")}/>
                    <div className={clsx(styles.boxItemContentWrapperRight, "boxContentStoreRight")}>
                        <p className={clsx(styles.boxVendorShop)}>VENDOR SHOP</p>
                        <p className={clsx(styles.boxItemDesc)}>Easy to <br/> start selling online</p>
                        <a href="#" className={clsx(styles.btnStartSelling)}>Start Selling</a>
                    </div>
                </div>
            </Slider>
            <div className={clsx(styles.btnControllWrapper)}>
                <div className={clsx(styles.btnControlContainer)}>
                    <div>
                        <p style={{fontSize: 14}}>Total stores showing: {storesData.length}</p>
                    </div>
                    <div className={clsx(styles.gridControllLeft)}>
                        <button className={clsx(styles.btnFilterStore)}
                            onClick={() => setFilterToggle(!filterToggle)}
                        >
                            <i class="fa-solid fa-arrow-down-short-wide"></i>
                            Filter
                        </button>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{fontSize: 14, marginRight: 4}}>Sort by: </p>
                            <select className={clsx(styles.selectSortBy)}>
                                <option value={NEWEST}>Most Recent</option>
                                <option value={POPULAR}>Most Popular</option>
                                <option value={RANDOM}>Random</option>
                            </select>
                        </div>
                        <button className={clsx(styles.btnSelectLayout, layout === GRID ? styles.active : null)}
                            onClick={() => settingLayout(GRID)}
                        
                        >
                            <i class="fa-solid fa-grip"></i>
                        </button>
                        <button className={clsx(styles.btnSelectLayout, layout === LIST ? styles.active : null)}
                            onClick={() => settingLayout(LIST)}
                        >
                            <i class="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    
                </div>

                <div className={clsx(styles.boxFilterSearchWrapper, filterToggle ? styles.active : null)}>
                    <div className={clsx(styles.boxFilterSearch)}>
                        <input
                            placeholder='Search Vendors'
                            className={clsx(styles.inputFilterSearch)}
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                        />                  
                        <div className={clsx(styles.boxBtnFilterSearch)}>
                            <button className={clsx(styles.btnFilterCancer)}>
                                Cancel
                            </button>
                            <button className={clsx(styles.btnFilterSearch)}
                                onClick={handleFilterStore}
                            >
                                APPLY
                            </button>
                        </div>
                    </div>
                </div>

                {
                    layout === GRID 
                    ?
                    <div className={clsx('row', styles.gridStoreList)}>
                        {
                            storesData && storesData.length && storesData.map((store, index) => {
                                return (
                                    <div className={clsx('col-12 col-md-6 col-lg-4', styles.gridStoreItem)}>
                                        <div className={clsx(styles.gridStoreItemChild)}>
                                            <div className={clsx(styles.gridStoreBoxImg)}>
                                                <img src={store.backgroudURL}
                                                    className={clsx(styles.backgroundStore)}
                                                />
                                                <div className={clsx(styles.contentStore)}>
                                                    <Link to={`/stores/${store.idStore}`}>
                                                        <p className={clsx(styles.storeName)}>{store.storeName}</p>
                                                    </Link>
                                                    <div>
                                                        {
                                                           
                                                            Array(Math.floor(store.rating)).fill(0).map((item, index) => {
                                                                return (
                                                                    <i
                                                                        className={`fa-solid fa-star ${styles.productIconStarSolids}`}
                                                                    ></i>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            
                                                            Array(Math.ceil(5 - store.rating)).fill(0).map((item, index) => {
                                                                return (
                                                                    <i
                                                                        className={`fa-regular fa-star ${styles.productIconStarRegulars}`}
                                                                    ></i>
                                                                )
                                                            })
                                                        }

                                                    </div>

                                                    <p className={clsx(styles.addressStore)}>{store.address}</p>

                                                    <div className={clsx(styles.boxTelStore)}>
                                                        <i class="fa-solid fa-phone"></i>
                                                        <p>{store.tel}</p>
                                                    </div>

                                                </div>
                                                {
                                                    checkStoreIsClosed(store.schedule) 
                                                    ?
                                                    <p className={clsx(styles.labelClosed)}>Closed</p>
                                                    :
                                                    <p className={clsx(styles.labelOpened)}>Open</p>
                                                }
                                            
                                                {
                                                    store.isFurtured &&
                                                    <p className={clsx(styles.labelFeatured)}>Featured</p>
                                                }

                                                <Link to={`/stores/${store.idStore}`}>
                                                    <img
                                                        className={clsx(styles.avatarStore)}
                                                        src={store.logoURL}
                                                    />
                                                </Link>
                                            </div>
                                            <div className={clsx(styles.boxNavigation)}>
                                                <Link to={`/stores/${store.idStore}`} className={clsx(styles.linkToStoreDetail)}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </Link>
                                            </div>
                                        </div> 
                                    </div>
                                )
                            })
                        }
                      
                    </div>
                    :
                    <div className={clsx('row g-0', styles.rowStoreList)}>
                        {
                            storesData && storesData.length && storesData.map((store, index) => {
                                return (
                                    <div className={clsx(styles.rowStoreItem)}>
                                        <img
                                            className={clsx(styles.backgroundRowStore)}
                                            src={store.backgroudURL}  
                                        />
                                        <div className={clsx(styles.rowBoxContent)}>
                                            <div style={{flex: 2}}>
                                                <Link to={`/stores/${store.idStore}`}>
                                                    <p className={clsx(styles.rowStoreName)}>{store.storeName}</p>
                                                </Link>
                                                <p className={clsx(styles.rowAddressStore)}>{store.address}</p>
                                            </div>
                                            <div style={{flex: 1}}>
                                                <div>
                                                    {
                                                        Array(Math.floor(store.rating)).fill(0).map((item, index) => {
                                                            return (
                                                                <i
                                                                    className={`fa-solid fa-star ${styles.productIconStarSolids}`}
                                                                ></i>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        Array(Math.ceil(5 - store.rating)).fill(0).map((item, index) => {
                                                            return (
                                                                <i
                                                                    className={`fa-regular fa-star ${styles.productIconStarRegulars}`}
                                                                ></i>
                                                            )
                                                        })
                                                    }
                                                
                                                </div>
                                                <p className={clsx(styles.rowRatingNumber)}>{store.rating} out of 5</p>
                                            </div>
                                            <div>
                                                <Link to={`/stores/${store.idStore}`} className={clsx(styles.linkToStoreDetail)}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        {
                                            checkStoreIsClosed(store.schedule) 
                                            ?
                                            <p className={clsx(styles.labelClosed)}>Closed</p>
                                            :
                                            <p className={clsx(styles.labelOpened)}>Open</p>
                                        }

                                        {
                                            store.isFurtured &&
                                            <p className={clsx(styles.labelFeatured)}>Featured</p>
                                        }

                                    </div>
                                )
                            })
                        }
                      
                    </div>
                }
                <div className={clsx("row")}>
                    <div className={clsx("col-12 col-md-4 col-lg-4")}>
                        <div>
                            <div className={clsx(styles.headerBoxListSelling)}>
                                <h1 className={clsx(styles.titleNameItem)}>Best Selling</h1>
                                <div className={clsx(styles.boxControlSlideItem)}>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexBestSelling !== 0 ? styles.active : "")}
                                        onClick={()=> {
                                            if (indexBestSelling !== 0) {
                                                sliderBestSellingRef.current.slickPrev();
                                            }
                                        }}
                                    >
                                        <i class="fa-solid fa-angle-left"></i>
                                    </button>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexBestSelling !== Math.floor(products.length / 3) ? styles.active : "")}
                                        onClick={()=>{
                                            if (indexBestSelling !== Math.floor(products.length / 3)) {
                                                sliderBestSellingRef.current.slickNext();
                                            }
                                        }}
                                    >
                                        <i class="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                            <Slider {...settingsBestSelling} className={clsx(styles.productList)} ref={sliderBestSellingRef}>
                                {
                                    products?.map((product, index)=>{
                                        return (
                                            <div className={clsx(styles.productItem)}>
                                                <Link className={clsx(styles.productBoxImg)} to={"/products/" + product.productID}>
                                                    <img src={product.imageSmall?.[0]?.imgURL}/>
                                                    
                                                    <button className={clsx(styles.btnOpenQuickView)}
                                                        onClick={e => handleOpenQuickView(e, product)}
                                                    >
                                                        <i class="fa-solid fa-expand"></i>
                                                    </button>
                                                </Link>
                                                <div>
                                                    <Link to={"/products/" + product.productID}>
                                                        <p className={clsx(styles.productItemName)}>{product.productName}</p>
                                                    </Link>
                                                    
                                                    <p className={clsx(styles.productItemPrice)}>${product.costLowest.toFixed(2)} - ${product.costHighest.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                               
                            </Slider>
                        </div>
                    </div>
                    <div className={clsx("col-12 col-md-4 col-lg-4")}>
                        <div>
                            <div className={clsx(styles.headerBoxListSelling)}>
                                <h1 className={clsx(styles.titleNameItem)}>Featured</h1>
                                <div className={clsx(styles.boxControlSlideItem)}>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexFeatured !== 0 ? styles.active : "")}   
                                        onClick={()=> {
                                            if (indexFeatured !== 0) {
                                                sliderFeaturedRef.current.slickPrev();
                                            }
                                        }}
                                    >   
                                        <i class="fa-solid fa-angle-left"></i>
                                    </button>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexFeatured !== Math.floor(products.length / 3) ? styles.active : "")}
                                        onClick={()=>{
                                            if (indexFeatured !== Math.floor(products.length / 3)) {
                                                sliderFeaturedRef.current.slickNext();
                                            }
                                        }}
                                    >
                                        <i class="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                            <Slider {...settingsFeatured} className={clsx(styles.productList)} ref={sliderFeaturedRef}>
                            {
                                    products?.map((product, index)=>{
                                        return (
                                            <div className={clsx(styles.productItem)}>
                                                <Link className={clsx(styles.productBoxImg)} to={"/products/" + product.productID}>
                                                    <img src={product.imageSmall?.[0]?.imgURL}/>
                                                    
                                                    <button className={clsx(styles.btnOpenQuickView)}
                                                        onClick={e => handleOpenQuickView(e, product)}
                                                    >
                                                        <i class="fa-solid fa-expand"></i>
                                                    </button>
                                                </Link>
                                                <div>
                                                    <Link to={"/products/" + product.productID}>
                                                        <p className={clsx(styles.productItemName)}>{product.productName}</p>
                                                    </Link>
                                                    
                                                    <p className={clsx(styles.productItemPrice)}>${product.costLowest.toFixed(2)} - ${product.costHighest.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className={clsx("col-12 col-md-4 col-lg-4")}>
                        <div>
                            <div className={clsx(styles.headerBoxListSelling)}>
                                <h1 className={clsx(styles.titleNameItem)}>Top Rated</h1>
                                <div className={clsx(styles.boxControlSlideItem)}>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexTopRated !== 0 ? styles.active : "")}
                                        onClick={()=> {
                                            if (indexTopRated !== 0) {
                                                sliderTopRatedRef.current.slickPrev();
                                            }
                                        }}
                                    >
                                        <i class="fa-solid fa-angle-left"></i>
                                    </button>
                                    <button className={clsx(styles.btnControlSlideItemSelling, indexTopRated !== Math.floor(products.length/3) ? styles.active : "")}
                                        onClick={()=>{
                                            if (indexTopRated !== Math.floor(products.length/3)) {
                                                sliderTopRatedRef.current.slickNext();
                                            }
                                        }}
                                    >
                                        <i class="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                            <Slider {...settingsTopRated} className={clsx(styles.productList)} ref={sliderTopRatedRef}>
                                {
                                    products?.map((product, index)=>{
                                        return (
                                            <div className={clsx(styles.productItem)}>
                                                <Link className={clsx(styles.productBoxImg)} to={"/products/" + product.productID}>
                                                    <img src={product.imageSmall?.[0]?.imgURL}/>
                                                    
                                                    <button className={clsx(styles.btnOpenQuickView)}
                                                        onClick={e => handleOpenQuickView(e, product)}
                                                    >
                                                        <i class="fa-solid fa-expand"></i>
                                                    </button>
                                                </Link>
                                                <div>
                                                    <Link to={"/products/" + product.productID}>
                                                        <p className={clsx(styles.productItemName)}>{product.productName}</p>
                                                    </Link>
                                                    
                                                    <p className={clsx(styles.productItemPrice)}>${product.costLowest.toFixed(2)} - ${product.costHighest.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
