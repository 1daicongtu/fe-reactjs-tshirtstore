import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './FeatureItems.module.scss';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import ItemProduct from '../../ItemProduct';

const FeatureItems = (
    {
        title,
        description,
        categoryType,
        itemShow = 3
    }
) => {
    const [itemProductMen, setItemProductMen] = React.useState([]);
    const allProducts = useSelector((state) => state.products.listProduct);
    const refNextBtn = useRef({});
    const refPrevBtn = useRef({});
    const refSlider = useRef({});

    const slidesToShow = itemShow;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: itemShow,
        slidesToScroll: 1,
        row: 1,
        arrows: false,
        afterChange: function (index) {
            if (index >= itemProductMen.length - slidesToShow) {
                refNextBtn.current.classList.add(styles.sliderDisabled);
            } else if (index === 0) {
                refPrevBtn.current.classList.add(styles.sliderDisabled);
            } else {
                refNextBtn.current.classList.remove(styles.sliderDisabled);
                refPrevBtn.current.classList.remove(styles.sliderDisabled);
            }
        },
        responsive: [
            {
                breakpoint: 991.98,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                },
            },
            {
                breakpoint: 575.98,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    slidesToScroll: 2,
                    arrows: false,
                    rows: 1,
                },
            },
        ],
    };

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const manProducts = allProducts.filter((item) => {
                if (
                    item.category &&
                    item.category?.some((str) => {
                        if (categoryType &&  str.toLowerCase() === categoryType.toLowerCase()){
                            return true;
                        }
                        return str.toLowerCase() === 'Men'.toLowerCase();
                    })
                ) {
                    return item;
                }
            });
            setItemProductMen(manProducts);
        }
    }, [allProducts]);

    return (
        <div className={clsx(styles.featureItems, styles.containers)}>
            <h3 className={clsx(styles.titleFeatureItems)}>{title}</h3>
            {
                description && (
                    <span className={clsx(styles.descFeatureItems)}>
                        {description}
                    </span>
                )
            }
            <div className={`${clsx(styles.featureItems)}`}>
                <Slider ref={refSlider} {...settings}>
                    {itemProductMen &&
                        itemProductMen.length > 0 &&
                        itemProductMen.map((product, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`col-6 col-md-${Math.floor(12/itemShow)} col-lg-${Math.floor(12/itemShow)}`}
                                >
                                    <ItemProduct product={product} />
                                </div>
                            );
                        })}
                </Slider>
                <span
                    ref={refPrevBtn}
                    className={clsx(styles.prevItem)}
                    onClick={() => refSlider.current.slickPrev()}
                >
                    <i className="fa-solid fa-angle-left"></i>
                </span>

                <span
                    ref={refNextBtn}
                    className={clsx(styles.nextItem)}
                    onClick={() => refSlider.current.slickNext()}
                >
                    <i className="fa-solid fa-angle-right"></i>
                </span>
            </div>
        </div>
    );
};

export default FeatureItems;
