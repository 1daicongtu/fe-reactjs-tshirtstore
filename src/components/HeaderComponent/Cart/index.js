import React from 'react';
import { Tooltip } from 'react-tooltip'
import clsx from 'clsx';
import styles from "./Cart.module.scss"
import { NavLink } from 'react-router-dom';


const Cart = (props) => {
    const [windowNote, setWindowNote] = React.useState(false);

    return (
        <>
            <div className={clsx(styles.modal, !props.cartList ? styles.unactive : "")}
                onClick={()=> props.setCartList(false)}
            ></div>
            <div className={clsx(styles.modalBox, props.cartList ? styles.active : "")}>
                <div className={clsx(styles.modalHeader)}>
                    <h1>My Cart</h1>
                    <span className={clsx(styles.btnCloseModal)}
                        onClick={()=> props.setCartList(false)}
                    >
                        <i class="fa-solid fa-angle-right"></i>
                    </span>
                </div>
                <div className={clsx(styles.modalBody)}>
                    <div className={clsx(styles.listItem)}>
                        <div className={clsx(styles.itemDetail)}>
                            <div className={clsx(styles.itemLeft)}>
                                <div className={clsx(styles.listItemImage)}>
                                    <img src="https://i.imgur.com/6JddsDH.jpg" alt="123" />
                                </div>
                                <div className={clsx(styles.listItemContent)}>
                                    <p className={clsx(styles.productName)}>Skrewdriver</p>
                                    <span className={clsx(styles.productDescription)}>
                                        Sweater / Brown / M
                                    </span>
                                    <div className={clsx(styles.boxChangeQuantity)}>
                                        <div className={clsx(styles.changeQuantity)}>
                                            <button className={clsx(styles.controlQuantity, styles.controlLeft)}>-</button>
                                            <input type="text" required name='qtyProduct' defaultValue="1"/>
                                            <button className={clsx(styles.controlQuantity, styles.controlRight)}>+</button>
                                        </div>
                                        <span>x $76.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.itemRight)}>
                                <span>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span className={clsx(styles.priceProduct)}>$76.00</span>
                            </div>
                        </div>
                        <div className={clsx(styles.itemDetail)}>
                            <div className={clsx(styles.itemLeft)}>
                                <div className={clsx(styles.listItemImage)}>
                                    <img src="https://i.imgur.com/6JddsDH.jpg" alt="123" />
                                </div>
                                <div className={clsx(styles.listItemContent)}>
                                    <p className={clsx(styles.productName)}>Skrewdriver</p>
                                    <span className={clsx(styles.productDescription)}>
                                        Sweater / Brown / M
                                    </span>
                                    <div className={clsx(styles.boxChangeQuantity)}>
                                        <div className={clsx(styles.changeQuantity)}>
                                            <button className={clsx(styles.controlQuantity, styles.controlLeft)}>-</button>
                                            <input type="text" required name='qtyProduct' value="1"/>
                                            <button className={clsx(styles.controlQuantity, styles.controlRight)}>+</button>
                                        </div>
                                        <span>x $76.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.itemRight)}>
                                <span>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span className={clsx(styles.priceProduct)}>$76.00</span>
                            </div>
                        </div>
                        <div className={clsx(styles.itemDetail)}>
                            <div className={clsx(styles.itemLeft)}>
                                <div className={clsx(styles.listItemImage)}>
                                    <img src="https://i.imgur.com/6JddsDH.jpg" alt="123" />
                                </div>
                                <div className={clsx(styles.listItemContent)}>
                                    <p className={clsx(styles.productName)}>Skrewdriver</p>
                                    <span className={clsx(styles.productDescription)}>
                                        Sweater / Brown / M
                                    </span>
                                    <div className={clsx(styles.boxChangeQuantity)}>
                                        <div className={clsx(styles.changeQuantity)}>
                                            <button className={clsx(styles.controlQuantity, styles.controlLeft)}>-</button>
                                            <input type="text" required name='qtyProduct' value="1"/>
                                            <button className={clsx(styles.controlQuantity, styles.controlRight)}>+</button>
                                        </div>
                                        <span>x $76.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.itemRight)}>
                                <span>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span className={clsx(styles.priceProduct)}>$76.00</span>
                            </div>
                        </div>
                        <div className={clsx(styles.itemDetail)}>
                            <div className={clsx(styles.itemLeft)}>
                                <div className={clsx(styles.listItemImage)}>
                                    <img src="https://i.imgur.com/6JddsDH.jpg" alt="123" />
                                </div>
                                <div className={clsx(styles.listItemContent)}>
                                    <p className={clsx(styles.productName)}>Skrewdriver</p>
                                    <span className={clsx(styles.productDescription)}>
                                        Sweater / Brown / M
                                    </span>
                                    <div className={clsx(styles.boxChangeQuantity)}>
                                        <div className={clsx(styles.changeQuantity)}>
                                            <button className={clsx(styles.controlQuantity, styles.controlLeft)}>-</button>
                                            <input type="text" required name='qtyProduct' value="1"/>
                                            <button className={clsx(styles.controlQuantity, styles.controlRight)}>+</button>
                                        </div>
                                        <span>x $76.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.itemRight)}>
                                <span>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span className={clsx(styles.priceProduct)}>$76.00</span>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.settingInfo)}>
                        <div className={clsx(styles.boxListOption)}>
                            <div className={clsx(styles.listOption)}>
                                <div className={clsx(styles.itemOption)}>
                                    <span>
                                        <i class="fa-regular fa-clipboard"></i>
                                    </span>
                                    <p>Note</p>
                                </div>

                                <div className={clsx(styles.itemOption)}>
                                    <span>
                                        <i class="fa-solid fa-truck-fast"></i>
                                    </span>
                                    <p>Shipping</p>
                                </div>
                                <div className={clsx(styles.itemOption)}>
                                    <span>
                                        <i class="fa-solid fa-percent"></i>
                                    </span>
                                    <p>Coupon</p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.calcPrice)}>
                            <div className={clsx(styles.priceBefore)}>
                                <span>Subtotal</span>
                                <span>$402.00</span>
                            </div>
                            <div className={clsx(styles.coupon)}>
                                <span>Coupon</span>
                                <Tooltip id="tooltip-removeCoupon" />
                                <div className={clsx(styles.couponChild)} data-tooltip-id="tooltip-removeCoupon" data-tooltip-content="remove">
                                    <i class="fa-solid fa-xmark"></i>
                                    <button>NS30</button>
                                    <p>-$120.60</p>
                                </div>
                            </div>
                            <div className={clsx(styles.isShipping)}>
                                <span>Shipping</span>
                                <span>Free Shipping</span>
                            </div>
                        </div>
                        <div className={clsx(styles.totalPrice)}>
                            <div className={clsx(styles.reallyPay)}>
                                <span>Total</span>
                                <span>$281.40</span>
                            </div>
                            
                        </div>
                        <div className={clsx(styles.boxProcessFreeship)}>
                            <div className={clsx(styles.totalProcessFreeship)}>
                                <div className={clsx(styles.currentProcessFreeship)}>
                                    <span className={clsx(styles.percentProcess)}>100%</span>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.noteFreeshipSuccess)}>
                            <span className={clsx(styles.iconNoteFreeship)}>
                                <i class="fa-regular fa-circle-check" style={{color: "#37c347"}}></i>
                            </span>
                            <span className={clsx(styles.textNoteFreeship)}>Congratulations! You've got free shipping.</span>
                        </div>
                    </div>
                    <div className={clsx(styles.boxButton)}>
                        <NavLink to="/" className={clsx(styles.btnViewCart, styles.btnControl)}>View CART</NavLink>
                        <NavLink to="/" className={clsx(styles.btnCheckout, styles.btnControl)}>Checkout</NavLink>
                    </div>

                </div>
                <div className={clsx(styles.layerModalNote, styles.unactive)}></div>
                <div className={clsx(styles.layerModalShipping, styles.unactive)}></div>
                <div className={clsx(styles.layerModalCoupon, styles.unactive)}></div>

                <div className={clsx(styles.addNote)}>
                    <p className={clsx(styles.btnCloseAddNote)}>
                        <span>
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </p>
                    <p className={clsx(styles.addNoteTitle)}>Add note</p>
                    <textarea name="titleAddNote" id="titleAddNote">Notes about your order, e.g. special notes for delivery</textarea>
                    <button>
                        SAVE
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;