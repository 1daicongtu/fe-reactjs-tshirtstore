import { GetColorName } from 'hex-color-to-color-name';
import React, { useEffect, useState } from 'react';
import getColor from '../../utils/getColor';
import clsx from 'clsx';
import styles from './ColorListProduct.module.scss';

const ColorListProduct = ({ product, setItemSelected }) => {
    const [colorSelected, setColorSelected] = useState(null);

    useEffect(() => {
        setColorSelected(
            product.listProduct.length > 0
                ? product.listProduct?.[0]?.color
                : '',
        );
    }, [product]);

    const handleClickIntoColor2 = (color) => {
        const productDetail = product.listProduct.find((productDetail) => {
            return productDetail.color === color;
        });
        setItemSelected(productDetail);
        setColorSelected(color);
    };

    return (
        <>
            <p className={clsx(styles.productColorName)}>
                Color: {colorSelected ? GetColorName(colorSelected) : ''}
            </p>
            <div className={clsx(styles.listColor)}>
                {getColor(product).map((color, index) => {
                    return (
                        <span
                            key={index}
                            className={clsx(
                                styles.productColorItem,
                                colorSelected === color ? styles.active : '',
                            )}
                            style={{
                                backgroundColor: `${color}`,
                            }}
                            onClick={() => handleClickIntoColor2(color)}
                        ></span>
                    );
                })}
            </div>
        </>
    );
};

export default ColorListProduct;
