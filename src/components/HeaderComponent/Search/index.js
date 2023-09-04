import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../redux/slices/headerStateSlice';
import { addToastMessage } from '../ToastMessage';
import axios from 'axios';
import convertPriceInt from '../../../utils/convertIntPriceToStringPriceDouble';
import { useDebounce } from 'use-debounce';
import { set } from 'react-hook-form';

const keywordsSuggest = ["Women", "Men", "Shirt"];


const Search = () => {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.headerStates.search);
    const [textSearch, setTextSearch] = useState('');
    const [debounceTextSearch] = useDebounce(textSearch, 500);
    const [searchResultList, setSearchResultList] = useState([]);

    const debouceSearch = async(textsearch)=>{
        try {
          
            const res = await axios.get(`${process.env.REACT_APP_PROXY}/products/textsearch`, {
                params: {
                    textsearch: textsearch
                }
            })
        
            setSearchResultList(res.data)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        if (debounceTextSearch.length > 0){
            debouceSearch(debounceTextSearch)
        } else {
            setSearchResultList([])
        }
    },[debounceTextSearch])


    return (
        <>
            <div
                className={clsx(styles.modal, !search ? styles.unactive : '')}
                onClick={() => dispatch(setSearch(false))}
            ></div>
            <div className={clsx(styles.modalBox, search ? styles.active : '')}>
                <div className={clsx(styles.modalHeader)}>
                    <span onClick={() => dispatch(setSearch(false))}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div className={clsx(styles.bodyModal)}>
                    <div className={clsx(styles.bodyModalChild)}>
                        <input
                            type="text"
                            placeholder="I'm shopping for..."
                            onChange={(e) => {setTextSearch(e.target.value)}}
                            value={textSearch} 
                        />
                        {!textSearch && (
                            <span
                                className={clsx(
                                    styles.controlInputSearch,
                                    styles.controlInputSearchIcon,
                                )}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        )}
                        {textSearch && (
                            <span
                                className={clsx(styles.controlInputSearch)}
                                onClick={() => setTextSearch('')}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        )}
                        <span
                            className={clsx(styles.mobileClose)}
                            onClick={() => dispatch(setSearch(false))}
                        >
                            <i className="fa-solid fa-angle-up"></i>
                        </span>
                    </div>
                </div>
                {
                    searchResultList.length > 0 && keywordsSuggest.length > 0
                    ? 
                    <>
                    </>
                    :
                    <div className={clsx(styles.keywordsSuggest)}>
                        <p>Popular Searches: </p>
                        {
                            keywordsSuggest.map((item, index)=>{
                                return (
                                    <span
                                        key={index}
                                        onClick={()=>{setTextSearch(item)}}
                                    >
                                        {item}
                                    </span>
                                )
                            })
                        }
                    </div>
                }
                {
                    searchResultList.length === 0 || !searchResultList 
                    ? 
                    <>
                    </>
                    :
                    <div className={`${clsx(styles.containerListItem)} container`}>
                        <div className={`${clsx(styles.listItem)} row g-0`}>
                            {
                                searchResultList.map((item, index)=>{
                                    if (index + 1 > 5){
                                        return <></>
                                    }
                                    return (
                                        
                                        <div
                                            key={index}
                                            className={`${clsx(
                                                styles.itemProductBox,
                                            )} col-12 col-md-2 col-lg-2`}
                                            onClick={()=>{dispatch(setSearch(false))}}
                                        >
                                            <div className={clsx(styles.itemProductBoxDetail)}>
                                                <NavLink
                                                    to={`/products/${item.productID}`}
                                                    className={clsx(
                                                        styles.navLinkProductDetail,
                                                    )}
                                                >
                                                    <img
                                                        src={item.listProduct?.[0]?.type?.[0]?.imageToShow?.front}
                                                        alt={`anh-demo` + index} 
                                                    />
                                                    <div
                                                        className={clsx(
                                                            styles.navLinkProductDesc,
                                                        )}
                                                    >
                                                        <h1
                                                            className={clsx(styles.productName)}
                                                        >
                                                            {item.productName}
                                                        </h1>
                                                        <span
                                                            className={clsx(
                                                                styles.productPrice,
                                                            )}
                                                        >
                                                          
                                                            {
                                                                `$${convertPriceInt(item.costLowest)} - $${convertPriceInt(item.costHighest)}`
                                                            }
                                                        </span>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                           
                        </div>

                        <NavLink to="#" className={clsx(styles.btnMoreResult)}
                        >
                            More Results
                        </NavLink>
                    </div>
                }
            </div>
        </>
    );
};

export default Search;
