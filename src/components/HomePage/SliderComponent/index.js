import clsx from "clsx";
import styles from "./SliderComponent.module.scss";
import "./SliderCoponent.css"
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { useRef } from "react";


const SliderComponent = () => {
    const refSlider = useRef({})
    const settings = {
        className: "home-slider",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        fade: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover:false
    }
    return (
        <div className="containerSlider">
            <Slider ref={refSlider} {...settings}>
                <div className={clsx(styles.itemSlider)}>
                    <img src="https://i.imgur.com/KvFRMtf.png" alt="banner 1" />
                    <div className={`${clsx(styles.itemSliderTitle)}`}>
                        <p className={`${clsx(styles.storeName)} storeName`}>ELESSI STORE</p>
                        <p className={`${clsx(styles.storeDesc)} storeDesc`}>EXCLUSIVE <br/> T-SHIRT DESIGNS</p>
                        <NavLink to="/" className={`${styles.linkToShop} linkShop`}>SHOP NOW</NavLink>
                    </div>
                </div>
                <div className={clsx(styles.itemSlider)}>
                    <img src="https://i.imgur.com/chLCSez.png" alt="banner 2" />
                    <div className={`${clsx(styles.itemSliderTitle)}`}>
                        <p className={`${clsx(styles.storeName)} storeName`}>ELESSI STORE</p>
                        <p className={`${clsx(styles.storeDesc)} storeDesc`}>Autum & Winter 2023</p>
                       <NavLink to="/"  className={`${styles.linkToShop} linkShop`}>SHOP NOW</NavLink>
                    </div>
                </div>
                <div className={clsx(styles.itemSlider)}>
                    <img src="https://i.imgur.com/702AZ4Q.jpg" alt="banner 3" />
                    <div className={`${clsx(styles.itemSliderTitle)}`}>
                        <p className={`${clsx(styles.storeName)} storeName`}>Limited time</p>
                        <p className={`${clsx(styles.storeDesc)} storeDesc`}>30% Off with <span>promo code</span></p>
                        <NavLink to="/" className={`${styles.linkToShop} linkShop`}>SHOP NOW</NavLink>
                    </div>
                </div>
            </Slider>
            <span className="prevSlide"
                onClick={() => refSlider.current.slickPrev()}
            >
                    <i className="fa-solid fa-angle-left"></i>
            </span>
            <span className="nextSlide"
                onClick={() => refSlider.current.slickNext()}
            >
                    <i className="fa-solid fa-angle-right"></i>
            </span>
        </div>
    );
};

export default SliderComponent;