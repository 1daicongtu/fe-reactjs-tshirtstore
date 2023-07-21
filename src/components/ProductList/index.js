import React from 'react';
import clsx from 'clsx';
import styles from './ProductList.module.scss';
import ItemProduct from '../ItemProduct';
import { useSelector } from 'react-redux';


const ProductList = ({categoreActive, category}) => {
    const listProduct = useSelector(state => state.products.listProduct);

    return (
        <div className={`row ${clsx(styles.productList, categoreActive === category ? styles.active : "")}`}>
           {
            listProduct && listProduct.length > 0 && listProduct.map((product, index) => {
                if (categoreActive === "All"){
                    return (
                        <ItemProduct key={product.productID} product={product}/>
                    )
                }else{
                    if (product.category.includes(category)){
                        return (
                            <ItemProduct key={product.productID} product={product}/>
                        )
                    }else {
                        return null;
                    } 
                }
            })
           }
               
        </div>
    );
};

export default ProductList;