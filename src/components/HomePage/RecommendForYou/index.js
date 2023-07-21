import React, { useRef } from 'react';
import styles from './RecommendForYou.module.scss';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../ProductList';

const RecommendForYou = () => {
    const listProduct = useSelector(state => state.products.listProduct)
    const [listCategories, setListCategories] = useState([]) 
    const [categoreActive, setCategoryActive] = useState(); 
    const refBoxItemCategory = useRef({});
    useEffect(()=>{
        const listCategoriesTemp = [];
        if (listProduct && listProduct.length > 0){
            listProduct.forEach(product => {
                product.category.forEach(category => {
                    if (!listCategoriesTemp.includes(category)){
                        listCategoriesTemp.push(category)
                    }
                })
            })
        }
        if (listCategoriesTemp.length > 0){
            setCategoryActive("All")
        }
        setListCategories(listCategoriesTemp)
    }, [listProduct])
   
    

    const handleChangeCategoryActive = (event, category) =>{
        setCategoryActive(category)
        
        if (refBoxItemCategory.current && event.currentTarget?.tagName === "LI"){
            const widthBoxItemCategoryAvg = refBoxItemCategory.current.offsetWidth / 2;
            const boundingEvent = event.target.getBoundingClientRect();
            const differentWidth = boundingEvent.left - widthBoxItemCategoryAvg;
            refBoxItemCategory.current.scrollLeft += differentWidth;
        }
    }

    return (
        
            (listCategories && listCategories.length > 0) 
            ?
            <div className={clsx(styles.recommendForYou)}>
                <h3 className={clsx(styles.titleRecommendForYou)}>Recommend For You</h3>
                <ul ref={refBoxItemCategory} className={clsx(styles.listCategory)}>
                    <li className={clsx(styles.itemCategory, "All" === categoreActive ?  styles.active : "")}
                        onClick={(e)=>{handleChangeCategoryActive(e, "All")}}
                    >All</li>
                    {listCategories && listCategories.length > 0 && listCategories.map((category, index) => {
                        return (
                            <li key={index} 
                            onClick={(e)=>{handleChangeCategoryActive(e, category)}}
                                className={clsx(styles.itemCategory, category === categoreActive ? styles.active : "")}>
                                    {category}
                            </li>
                        )
                        
                    })}
                </ul>
                <div className={clsx(styles.listProductByCategory)}>
                    <ProductList categoreActive={categoreActive} category={"All"}/>
                    {
                        
                        listCategories && listCategories.length > 0 && listCategories.map((category, index) => {  
                            return (
                                <ProductList key={index} categoreActive={categoreActive} category={category}/>
                            )
                        })
                    }
                </div>
            </div>
            : 
            <div></div>
        
    );
};

export default RecommendForYou;