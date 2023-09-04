import clsx from 'clsx';
import styles from './ProductDetail.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import convertPriceInt from '../../utils/convertIntPriceToStringPriceDouble';
import StyleTshirt from '../StyleTshirt';
import ColorListProduct from '../ColorListProduct';
import SizeListProduct from '../SizeListProduct';
import ControlQuantityProduct from '../ControlQuantityProduct';
import SizeGuide from '../SizeGuideModal';
import DeliveryModal from '../DeliveryModal';
import AskQuestionForProductModal from '../AskQuestionForProductModal';
import { Tooltip } from 'react-tooltip';
import guarenteedSafeImg from "../../assets/trust_badge(1).png"
import DescriptionProduct from './DescriptionProduct';
import CustomTabProduct from './CustomTabProduct';
import ReviewProduct from './ReviewProduct';
import ListServicesDemo from '../HomePage/ListServicesDemo';
import FeatureItems from '../HomePage/FeatureItems';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import { getRandomNumberWithRange } from '../../utils/getRandomNumberWithRange';
import { getDeliveryTime } from '../../utils/getDeliveryTime';
import { setCompareList } from '../../redux/slices/headerStateSlice';
import { addItemToCompareList } from '../../redux/slices/compareSlice';
import { addItem, addOneWishlistToServer, deleteItemInWistListByProductID, removeItemById } from '../../redux/slices/wishlistSlice';
import TreePath from '../TreePath';
import configs from '../../config';
import { handleDataAddToCart } from '../../utils/HandleWithCartList';

const shareOnOtherSocial = [
    {
        name: "Twitter",
        icon: "fab fa-twitter",
        link: `https://twitter.com/share?url=${window.location.href}`
    },
    {
        name: "Facebook",
        icon: "fab fa-facebook-f",
        link: `https://www.facebook.com/sharer.php?u=${window.location.href}}`
    }
    ,
    {
        name: "Mail",
        icon: "fas fa-envelope",
        link: `mailto:${window.location.href}`
    },
    {
        name: "Instagram",
        icon: "fab fa-instagram",
        link: `https://www.instagram.com/?url=${window.location.href}`
    }
]

const listTabProduct = [
    {
        name: "Description",
        component: DescriptionProduct
    },
    {
        name: "Review",
        component: ReviewProduct
    },
    {
        name: "Custom Tab",
        component: CustomTabProduct
    },
]

const ProductDetail = () => {
    
    const dispatch = useDispatch();
    const localtion = useLocation();
    const [quantity, setQuantity] = useState(1);
    const refCheckInCart = useRef(null);
    const [nav2, setNav2] = useState(null);
    const [nav1, setNav1] = useState(null);
    const products = useSelector((state) => state.products.listProduct);
    const [product, setProduct] = useState(null);
    const [productStyleSelected, setProductStyleSelected] = useState(null);
    const [prevProduct, setPrevProduct] = useState(null);
    const [nextProduct, setNextProduct] = useState(null);
    const [productDetailActive, setProductDetailActive] = useState(null);
    // value == 0, no one tab is active, tab active depend on index when render with map
    const [tabServicesActive, setTabServicesActive] = useState(0);
    const [tabProductActive, setTabProductActive] = useState(0);
    const [imageThumnailSelected, setImageThumnailSelected] = useState(0);
    const [sizeSelected, setSizeSelected] = useState(null);

    const listWishList = useSelector((state) => state.wishlist.wishLists)?.map(
        (product2) => {
            
            return product2.productID;
        },
    );
    const listCompare = useSelector((state) => state.compare.compareList)?.map(
        (product2) => {
            return product2.productID;
        },
    );
    const [wishListTick, setWishListTick] = useState(
        listWishList.includes(product?.productID) ? true : false
    );
    // random value
    const [peopleAddToCart, setPeopleAddToCart]= useState(0);
    const [peoplePurchased, setPeoplePurchased] = useState(0);
    const [peopleWatching, setPeopleWatching] = useState(0);
    const [deliveryTime, setDeliveryTime] = useState("");

    const userLogin = useSelector(state => state.userLogin)
    
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

    const listService = [
        {
            icon: "fa-solid fa-clipboard",
            name: "Size Guide",
            modal: (SizeGuide)
        },
        {
            icon: "fa-solid fa-rotate-left",
            name: "Delivery & Return",
            modal: (DeliveryModal)
        },
        {
            icon: "fa-solid fa-question",
            name: "Ask a Question",
            modal: (AskQuestionForProductModal)
        }
    ]


    const { id } = useParams();

    useEffect(() => {
        if (products) {
            const index = products.findIndex((product) => {
                return product.productID == id;
            });
            setProduct(products[index]);

            if (index !== -1) {
                if (index > 0) {
                    setPrevProduct(products[index - 1]);
                } else {
                    setPrevProduct(null);
                }
                if (index < products.length - 1) {
                    setNextProduct(products[index + 1]);
                } else {
                    setNextProduct(null);
                }
            }
        }
    }, [id, products]);

    useEffect(() => {
        if (product) {
            setProductStyleSelected(product.listProduct?.[0]);
        }
    }, [product]);

    useEffect(() => {
        // random

        setDeliveryTime(getDeliveryTime());
        setPeopleAddToCart(getRandomNumberWithRange(1, 500));
        setPeoplePurchased(getRandomNumberWithRange(1, 100));
        setPeopleWatching(getRandomNumberWithRange(1, 50));


        let timeTimeout;
        const timeIntervalBanner = setInterval(async () => {
            if (refCheckInCart.current) {
                timeTimeout = setTimeout(() => {
                    refCheckInCart.current.style =
                        'transform: translateY(-22px); transition: transform 1s ease-in-out;';
                }, 1000);

                let length = refCheckInCart.current.children?.length;

                if (length == 2) {
                    const firstChild = refCheckInCart.current?.children?.[0];
                    refCheckInCart.current.removeChild(firstChild);
                    refCheckInCart.current.appendChild(firstChild);
                    refCheckInCart.current.style =
                        'transform: translateY(-1px); transition: transform 0s ease-in-out;';
                }
            }
        }, 2000);

        return () => {
            clearTimeout(timeTimeout);
            clearInterval(timeIntervalBanner);
        };
    }, []);

    useEffect(() => {
        if (productStyleSelected) {
            setProductDetailActive(productStyleSelected.type?.[0]);
        }
    }, [productStyleSelected])

    useLayoutEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: "auto"
        })
    }, [localtion])

    const optionsThumnail = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rows: 2
    }
    const optionsGalery = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rows: 2
    }

    const handleScrollToGalery = (e)=>{
        e.preventDefault();
        const id = e.currentTarget.getAttribute("href");
        const element = document.querySelector(id);
        const top = element.offsetTop;
        window.scrollTo({
            top: top - 100,
            behavior: "smooth"
        })
    }

    const handleSetSizeSelected = (size)=>{
        setSizeSelected(size);
    }

    return product ? (
        <div className={clsx(styles.productDetail)}>
            <TreePath 
                title={product?.productName}
                listPathTree={[
                    {
                        name: "Home",
                        link: configs.routes.homePage,

                    },
                    {
                        name: product?.productName,
                        link: null
                    }
                ]}
            />
            <div className={clsx(styles.productDetailContent)}>
                <div className="row w-100">
                    <div className={`col-12 col-md-6 col-lg-6 px-xs-0 ${clsx(styles.productImageDemoBox)}`}>
                        <div className={clsx(styles.thumnailProductImageList)}>
                            <Slider
                                asNavFor={nav1}
                                ref={(slider) => setNav2(slider)}
                                {...optionsThumnail}
                            >
                                {
                                    productDetailActive && Object.values(productDetailActive?.imageSmall).map((image, index)=>{
                                        return (
                                            <div key={index} className={clsx(styles.thunailProductImageItem, index === imageThumnailSelected ? styles.active : "")}
                                                onClick={()=>setImageThumnailSelected(index)}
                                            >
                                                <a href={`#image-galery-${index}`}
                                                    onClick={handleScrollToGalery}
                                                >
                                                    <img src={image} alt={`image-thumnail-${index}`}/>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                               {/*  <div className={clsx(styles.thunailProductImageItem)}>
                                    <img src='https://i.imgur.com/HPU4IBl.jpg' alt='aaa'/>
                                </div>
                                <div className={clsx(styles.thunailProductImageItem)}>
                                    <img src='https://i.imgur.com/HPU4IBl.jpg' alt='aaa'/>
                                </div>
                                */}
                            </Slider>
                        </div>
                        <div className={clsx(styles.galeryProductImageList)}>
                            <div className={clsx(styles.boxControllerWishlist)}>
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
                                    {listWishList.includes(product.productID) ? (
                                        <i
                                            className={`fa-solid fa-heart  ${styles.active}`}
                                        ></i>
                                    ) : (
                                        <i className="fa-regular fa-heart"></i>
                                    )}
                                </button>
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
                                    {listCompare.includes(product.productID) ? (
                                        <i
                                            className={`fa-solid fa-check ${styles.active}`}
                                        ></i>
                                    ) : (
                                        <i className="fa-solid fa-rotate"></i>
                                    )}
                                </button>
                            </div>
                            <Slider
                                asNavFor={nav2}
                                ref={slider => setNav1(slider)}
                                {...optionsGalery}
                            >
                                {
                                    productDetailActive && Object.values(productDetailActive?.imageToShow).map((image, index)=>{
                                        return (
                                            <div key={index} className={clsx(styles.galeryProductImageItem)}
                                                id={`image-galery-${index}`}
                                            >
                                                <SideBySideMagnifier
                                                    imageSrc={image}
                                                    largeImageSrc={image}
                                                    alwaysInPlace={true}
                                                 
                                                />
                                                
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className={clsx(styles.galeryProductImageItem)}>
                                    <img src="https://i.imgur.com/ZzTXja1.jpg" alt="aa" />
                                </div>
                                <div className={clsx(styles.galeryProductImageItem)}>
                                    <img src="https://i.imgur.com/ZzTXja1.jpg" alt="aa" />
                                </div> */}
                            </Slider>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 px-xs-3">
                        <div className={clsx(styles.productDetail)}>
                            <div className={clsx(styles.productDetailName)}>
                                <h1 className={clsx(styles.productNameValue)}>
                                    {product?.productName}
                                </h1>
                                <div className={clsx(styles.productNextTo)}>
                                    {prevProduct && (
                                        <div
                                            className={clsx(styles.productPrev)}
                                        >
                                            <Link
                                                to={`/products/${prevProduct.productID}`}
                                                className={clsx(
                                                    styles.productPrevLink,
                                                )}
                                            >
                                                <i
                                                    className={`fa-solid fa-chevron-left ${clsx(
                                                        styles.productPrevIcon,
                                                    )}`}
                                                ></i>
                                                <div
                                                    className={clsx(
                                                        styles.productPrevDemo,
                                                    )}
                                                >
                                                    <img
                                                        className={clsx(
                                                            styles.productPrevDemoImage,
                                                        )}
                                                        src={
                                                            prevProduct
                                                                .imageSmall?.[0]
                                                                ?.imgURL
                                                        }
                                                    />
                                                    <div
                                                        className={clsx(
                                                            styles.productPrevDemoContent,
                                                        )}
                                                    >
                                                        <p
                                                            className={clsx(
                                                                styles.productPrevDemoName,
                                                            )}
                                                        >
                                                            {
                                                                prevProduct.productName
                                                            }
                                                        </p>
                                                        <p
                                                            className={clsx(
                                                                styles.productPrevDemoPrice,
                                                            )}
                                                        >
                                                            $
                                                            {convertPriceInt(
                                                                prevProduct.costLowest,
                                                            )}{' '}
                                                            - $
                                                            {convertPriceInt(
                                                                prevProduct.costHighest,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}

                                    {nextProduct && (
                                        <div
                                            className={clsx(styles.productNext)}
                                        >
                                            <Link
                                                to={`/products/${nextProduct.productID}`}
                                                className={clsx(
                                                    styles.productNextLink,
                                                )}
                                            >
                                                <i
                                                    className={`fa-solid fa-chevron-right ${clsx(
                                                        styles.productNextIcon,
                                                    )}`}
                                                ></i>
                                                <div
                                                    className={clsx(
                                                        styles.productNextDemo,
                                                    )}
                                                >
                                                    <img
                                                        className={clsx(
                                                            styles.productNextDemoImage,
                                                        )}
                                                        src={
                                                            nextProduct
                                                                .imageSmall?.[0]
                                                                ?.imgURL
                                                        }
                                                        alt="product-next-demo"
                                                    />
                                                    <div
                                                        className={clsx(
                                                            styles.productNextDemoContent,
                                                        )}
                                                    >
                                                        <p
                                                            className={clsx(
                                                                styles.productNextDemoName,
                                                            )}
                                                        >
                                                            {
                                                                nextProduct.productName
                                                            }
                                                        </p>
                                                        <p
                                                            className={clsx(
                                                                styles.productNextDemoPrice,
                                                            )}
                                                        >
                                                            $
                                                            {convertPriceInt(
                                                                nextProduct.costLowest,
                                                            )}{' '}
                                                            - $
                                                            {convertPriceInt(
                                                                nextProduct.costHighest,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Link to={`/categories/${product?.storeID}`}>
                                <img
                                    className={clsx(styles.storeLogoOfProduct)}
                                    src={product?.storeIMG}
                                    alt="store logo"
                                />
                            </Link>
                            <h1 className={clsx(styles.productPriceRange)}>
                                ${convertPriceInt(product?.costLowest)} - $
                                {convertPriceInt(product?.costHighest)}
                            </h1>

                            <div className={clsx(styles.checkInCartBox)}>
                                <div
                                    className={`${clsx(styles.checkInCart)}`}
                                    ref={refCheckInCart}
                                >
                                    <div
                                        className={`check-in-cart ${clsx(
                                            styles.checkInCardNow,
                                        )}`}
                                    >
                                        <i
                                            className={`fa-solid fa-fire ${clsx(
                                                styles.fireIcon,
                                            )}`}
                                        ></i>
                                        <p
                                            className={clsx(
                                                styles.checkInCartTitle,
                                            )}
                                        >
                                            Hurry! Over {peopleAddToCart} people have this in
                                            their carts
                                        </p>
                                    </div>
                                    <div
                                        className={`number-buy-now ${clsx(
                                            styles.checkLastSold,
                                        )}`}
                                    >
                                        <i
                                            className={`fa-solid fa-fire ${clsx(
                                                styles.fireIcon,
                                            )}`}
                                        ></i>
                                        <p
                                            className={clsx(
                                                styles.checkInCartTitle,
                                            )}
                                        >
                                            {peoplePurchased} sold in last 1 hours
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.productShortDescription)}
                            >
                                {product.descriptionShort}
                            </div>

                            <StyleTshirt 
                                itemSelected={productStyleSelected}
                                productDetailActive={productDetailActive}
                                setProductDetailActive={setProductDetailActive}
                            ></StyleTshirt>
                            <ColorListProduct 
                                product={product}
                                setItemSelected={setProductStyleSelected}
                            />
                            <SizeListProduct product={product}
                                sizeSelected={sizeSelected}
                                handleSetaSizeSelected={handleSetSizeSelected}
                            />

                            <div className={clsx(styles.priceItemProductSelect)}>
                                ${convertPriceInt(productDetailActive?.price)}
                            </div>

                            <ControlQuantityProduct
                                quantity={quantity}
                                setQuantity={setQuantity}
                                dataAddToCart={handleDataAddToCart(product, productStyleSelected, sizeSelected, quantity, productDetailActive)}
                            />
                            
                            <div className={clsx(styles.listServices)}>
                                {
                                    listService && listService.map((service, index)=>{
                                        return (
                                            <div className={clsx(styles.itemService)}
                                                onClick={()=>setTabServicesActive(index+1)}
                                                key={index}
                                            >
                                                <i className={`${service.icon}`}></i>  
                                                <span className={styles.itemServiceName}>{service.name}</span>      

                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {
                                listService && listService.map((service, index)=>{
                                    return (
                                        <service.modal 
                                            key={index}
                                            setTabServicesActive={setTabServicesActive}
                                            tabServicesActive={tabServicesActive}
                                            keyTab={index+1}
                                            product={product}
                                        />
                                    )
                                })
                            }

                            <div className={styles.deliveryTime}>
                                <span className={styles.iconServices}>
                                    <i className="fa-solid fa-truck-fast"></i>
                                </span>
                                <div className={styles.nameServices}>               
                                    Estimated Delivery:
                                    <span>{deliveryTime}</span>
                                </div>
                            </div>
                            <div className={styles.peopleNumberWatching}>
                                <span className={`${clsx(styles.iconServices, styles.iconServicesSmile)}`}>
                                    <i className="fa-regular fa-face-smile"></i>
                                </span>
                                <div className={styles.nameServices}>
                                    {peopleWatching} People
                                    <span>are viewing this right now</span>
                                </div>
                            </div>
                            <div className={styles.shareToOtherSocial}>
                                <span className={styles.iconServices}>
                                    <i className="fa-solid fa-share-nodes"></i>
                                </span>
                                <div className={styles.nameServices}>
                                    Share
                                </div>
                                {
                                    shareOnOtherSocial && shareOnOtherSocial.length > 0
                                    &&
                                    <ul className={styles.listSocialNetword}>  
                                        {
                                            shareOnOtherSocial.map((social, index)=>{
                                                return (
                                                    <li key={index} className={clsx(styles.itemSocialNetwork)}>
                                                        <a
                                                            href={social.link}
                                                            data-tooltip-id={`tt-${social.name}-id`}
                                                            data-tooltip-content={social.name}
                                                            target='_blank'
                                                        >
                                                            <i className={social.icon}></i>
                                                        </a>
                                                        <Tooltip id={`tt-${social.name}-id`} place="top" />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>     
                                }

                            </div>
                            <div className={clsx(styles.productGuarenteedSafe)}>
                                <p className={clsx(styles.productGuarenteedSafeTitle)}>
                                    Guaranteed Safe Checkout
                                </p>
                                <img 
                                    className={clsx(styles.productGuarenteedSafeImg)}
                                    src={guarenteedSafeImg} alt="guarented img"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.productTabList}>
                    <ul className={styles.productTabListContent}>
                        {
                            listTabProduct && listTabProduct.map((tab, index)=>{
                                return (
                                    <li className={clsx(styles.productTabItem, tabProductActive == index ? styles.active : "")}
                                        onClick={()=>setTabProductActive(index)}
                                        key={index}
                                    >
                                        {tab.name}
                                    </li>
                                )
                            })
}
                    </ul>
                    <div className={clsx(styles.productTabContent)}>
                        {
                            listTabProduct && listTabProduct.map((tab, index)=>{
                                return (
                                    <div 
                                        key={index}
                                        className={clsx(styles.productTabItemContent, tabProductActive == index ? styles.active : "")}
                                    >
                                        <tab.component product={product}/>   
                                        
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <ul className={clsx(styles.fieldReferenceProduct)}>
                    <li className={clsx(styles.fieldReferenceProductItem)}>
                        SKU:
                        <p className={clsx(styles.fieldReferenceProudct)}>{product?.SKU}</p>
                    </li>
                    <li className={clsx(styles.fieldReferenceProductItem)}>
                        <span className={clsx(styles.fieldReferenceProudct)}>/</span>
                    </li>
                    <li className={clsx(styles.fieldReferenceProductItem)}>
                        Category:
                        <div className={clsx(styles.fieldReferenceProudct)}>
                            {
                                product.category?.map((category, index)=>{
                                    return (
                                        <>
                                            <Link key={index} to={"/categorys/"}>{category}</Link>
                                            {index != product.category?.length - 1 && <span className={clsx(styles.fieldReferenceProudct)}>,</span>}
                                        </>
                                    )
                                })
                            }
                        </div>
                    </li>
                    <li className={clsx(styles.fieldReferenceProductItem)}>
                        <span className={clsx(styles.fieldReferenceProudct)}>/</span>
                    </li>
                    <li className={clsx(styles.fieldReferenceProductItem)}>
                        Tag:
                        {
                            product.tag?.map((tag, index)=>{
                                return (
                                    <Fragment key={index}>
                                        <p className={clsx(styles.fieldReferenceProudct)}>{tag}</p>
                                        {index != product.tag?.length - 1 && <span className={clsx(styles.fieldReferenceProudct)}>,</span>}
                                    </Fragment>
                                )
                            })
                        }
                    </li>         
                </ul>

                <div className={clsx(styles.productRelated)}>
                </div>
                <FeatureItems
                    title={"Related Products"}
                    itemShow={4}
                    categoryType={product.category?.[0]}
                >   

                </FeatureItems>
                <div className="mt-5">
                    <ListServicesDemo/>
                </div>
            </div>
           
        </div>
    ) : (
        <></>
    );
};

export default ProductDetail;



