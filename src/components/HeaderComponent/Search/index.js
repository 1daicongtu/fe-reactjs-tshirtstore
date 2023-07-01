import React, { useState } from 'react';
import styles from "./Search.module.scss"
import clsx from "clsx"
import { NavLink } from 'react-router-dom';


const Search = ({search, setSearch}) => {
    const [textSearch, setTextSearch] = useState("")
    return (
        <>
            <div className={clsx(styles.modal, !search ? styles.unactive : "") }
                onClick={()=>setSearch(false)}
            ></div>
            <div className={clsx(styles.modalBox, search ? styles.active : "")}>
                <div className={clsx(styles.modalHeader)}>
                    <span
                        onClick={()=>setSearch(false)}
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div className={clsx(styles.bodyModal)}>
                    <div className={clsx(styles.bodyModalChild)}>
                        <input type="text" placeholder="I'm shopping for..." 
                            value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}
                        />
                        {!textSearch && 
                            <span className={clsx(styles.controlInputSearch, styles.controlInputSearchIcon)}>
                             <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        }
                        {textSearch && <span className={clsx(styles.controlInputSearch)}
                            onClick={()=>setTextSearch("")}
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </span>}
                        <span className={clsx(styles.mobileClose)}
                            onClick={()=>setSearch(false)}
                        >
                            <i className="fa-solid fa-angle-up"></i>
                        </span>
                    </div>
                </div>
                <div className={clsx(styles.keywordsSuggest)}>
                    <p>Popular Searches: </p>
                    <span>Jacket</span>
                    <span>Shirt</span>
                    <span>Fresh</span>
                </div>
                <div className={`${clsx(styles.containerListItem)} container`}>
                    <div className={`${clsx(styles.listItem)} row g-0`}>
                        <div className={`${clsx(styles.itemProductBox)} col-12 col-md-2 col-lg-2`}>
                            <div className={clsx(styles.itemProductBoxDetail)}>
                                <NavLink to="/" className={clsx(styles.navLinkProductDetail)}>
                                    <img src="https://i.imgur.com/osdqRRs.jpg" alt="" />
                                    <div className={clsx(styles.navLinkProductDesc)}>
                                        <h1 className={clsx(styles.productName)}>Plain Shirt General</h1>
                                        <span className={clsx(styles.productPrice)}>$29.00</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className={`${clsx(styles.itemProductBox)} col-12 col-md-2 col-lg-2`}>
                            <div className={clsx(styles.itemProductBoxDetail)}>
                                <NavLink to="/" className={clsx(styles.navLinkProductDetail)}>
                                    <img src="https://i.imgur.com/osdqRRs.jpg" alt="" />
                                    <div className={clsx(styles.navLinkProductDesc)}>
                                        <h1 className={clsx(styles.productName)}>Plain Shirt General</h1>
                                        <span className={clsx(styles.productPrice)}>$29.00</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className={`${clsx(styles.itemProductBox)} col-12 col-md-2 col-lg-2`}>
                            <div className={clsx(styles.itemProductBoxDetail)}>
                                <NavLink to="/" className={clsx(styles.navLinkProductDetail)}>
                                    <img src="https://i.imgur.com/osdqRRs.jpg" alt="" />
                                    <div className={clsx(styles.navLinkProductDesc)}>
                                        <h1 className={clsx(styles.productName)}>Plain Shirt General</h1>
                                        <span className={clsx(styles.productPrice)}>$29.00</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className={`${clsx(styles.itemProductBox)} col-12 col-md-2 col-lg-2`}>
                            <div className={clsx(styles.itemProductBoxDetail)}>
                                <NavLink to="/" className={clsx(styles.navLinkProductDetail)}>
                                    <img src="https://i.imgur.com/osdqRRs.jpg" alt="" />
                                    <div className={clsx(styles.navLinkProductDesc)}>
                                        <h1 className={clsx(styles.productName)}>Plain Shirt General</h1>
                                        <span className={clsx(styles.productPrice)}>$29.00</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className={`${clsx(styles.itemProductBox)} col-12 col-md-2 col-lg-2`}>
                            <div className={clsx(styles.itemProductBoxDetail)}>
                                <NavLink to="/" className={clsx(styles.navLinkProductDetail)}>
                                    <img src="https://i.imgur.com/osdqRRs.jpg" alt="" />
                                    <div className={clsx(styles.navLinkProductDesc)}>
                                        <h1 className={clsx(styles.productName)}>Plain Shirt General</h1>
                                        <span className={clsx(styles.productPrice)}>$29.00</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    

                    <NavLink to="#" className={clsx(styles.btnMoreResult)}>
                        More Results
                    </NavLink>
                </div>
            </div>  
        </>
    );
};

export default Search;