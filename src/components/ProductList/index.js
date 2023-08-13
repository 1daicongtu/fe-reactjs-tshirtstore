import React from 'react';
import clsx from 'clsx';
import styles from './ProductList.module.scss';
import ItemProduct from '../ItemProduct';
import { useSelector } from 'react-redux';

const ProductList = ({ categoreActive, category }) => {
    const listProduct = useSelector((state) => state.products.listProduct);

    return (
        <div
            className={`row g-0 ${clsx(
                styles.productList,
                categoreActive === category ? styles.active : '',
            )}`}
        >
            {listProduct &&
                listProduct.length > 0 &&
                listProduct.map((product, index) => {
                    if (categoreActive === 'All') {
                        return (
                            <div
                                key={index}
                                className="col-6 col-md-4 col-lg-3"
                            >
                                <ItemProduct
                                    key={product.productID}
                                    product={product}
                                />
                            </div>
                        );
                    } else {
                        if (product.category.includes(category)) {
                            return (
                                <div
                                    key={index}
                                    className="col-6 col-md-4 col-lg-3"
                                >
                                    <ItemProduct
                                        key={product.productID}
                                        product={product}
                                    />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    }
                })}
        </div>
    );
};

export default ProductList;
