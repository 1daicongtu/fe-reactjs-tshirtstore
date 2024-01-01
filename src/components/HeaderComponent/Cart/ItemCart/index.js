import clsx from "clsx";
import styles from "./ItemCart.module.scss"
import { GetColorName } from "hex-color-to-color-name";
import convertPriceInt from "../../../../utils/convertIntPriceToStringPriceDouble";
import { deleteItemCartToServer, removeCart, updateCart, updateCartItemToServer } from "../../../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setCartList } from '../../../../redux/slices/headerStateSlice';


const ItemCart = ({itemCart}) => {
   
    const [item, setItem] = useState(itemCart);

    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(itemCart.quantity);

    useEffect(()=>{
        setQuantity(itemCart.quantity)
    }, [itemCart])

    const handleUpdateItemCart = (newQuantity)=>{
        if (quantity >= 0) {
           
            if (userLogin.isLogin){
                dispatch(updateCartItemToServer({
                    userID: userLogin.user?._id,
                    productID: itemCart.productID,
                    sizeSelected: itemCart.sizeSelected,
                    colorSelected: itemCart.colorSelected,
                    productDetailSelected: itemCart.productDetailSelected,
                    quantity: newQuantity
                }))
            } else {
                dispatch(updateCart({
                    productID: itemCart.productID,
                    sizeSelected: itemCart.sizeSelected,
                    colorSelected: itemCart.colorSelected,
                    productDetailSelected: itemCart.productDetailSelected,
                    quantity: newQuantity
                }))
            }  
        }
    }

    const handleIncreaseQuantity = (e) => {
        setQuantity(quantity - 0  + 1)
        handleUpdateItemCart(quantity - 0 + 1);
    }
    const handleDecreaseQuantity = (e) => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
            handleUpdateItemCart(quantity - 1);
        }
    }

    const handleDeleteItemCart = async ()=>{
        if (userLogin.isLogin){
            
            const res = await dispatch(deleteItemCartToServer({
                userID: userLogin.user?._id,
                productID: itemCart.productID,
                sizeSelected: itemCart.sizeSelected,
                colorSelected: itemCart.colorSelected,
                typeName: itemCart.productDetailSelected?.typeName
            }))
        
            if (res.payload?.data?.success){
                setItem(null);
            }
        } else {
            dispatch(removeCart({
                productID: itemCart.productID, 
                sizeSelected: itemCart.sizeSelected, 
                colorSelected: itemCart.colorSelected, 
                typeName: itemCart.productDetailSelected?.typeName
            }))
        }
    }
    const handleChangeQuantityWithKeyboard = (e)=>{
        let newQuantity = quantity;
        if (Number.isInteger(e.target.value - 0) && e.target.value > 0){
            newQuantity = e.target.value - 0;
            handleUpdateItemCart(newQuantity);
        }
        if (e.target.value === ""){
            newQuantity = 0
        }
        setQuantity(newQuantity);
    }
    const handleBlurQuantity = (e)=>{
        if (quantity == "0"){
            setQuantity(1)
            handleUpdateItemCart(1);
        }
    }

    function calcTotalItemCart(){
        return Number(itemCart.quantity * convertPriceInt(itemCart.productDetailSelected?.price)).toFixed(2)
    }


    return (
        
            item 
            ?
            <div className={clsx(styles.itemDetail)}>
                                            <div className={clsx(styles.itemLeft)}>
                                                <div className={clsx(styles.listItemImage)}>
                                                    <img
                                                        src={itemCart.productDetailSelected?.imageSmall?.front}
                                                        alt={`id + ${itemCart.productID}`}
                                                    />
                                                </div>
                                                <div
                                                    className={clsx(styles.listItemContent)}
                                                >
                                                    <Link to={`/products/${itemCart.productID}`}
                                                        onClick={()=>{dispatch(setCartList(false))}}
                                                        className={clsx(styles.productNameLink)}
                                                    >
                                                        <p className={clsx(styles.productName)}>
                                                            {itemCart.productName}
                                                        </p>
                                                    </Link>
                                                    
                                                    <span
                                                        className={clsx(
                                                            styles.productDescription,
                                                        )}
                                                    >
                                                        {`${itemCart.productDetailSelected?.typeName} / ${GetColorName(itemCart.colorSelected)} / ${itemCart.sizeSelected}`}
                                                    </span>
                                                    <div
                                                        className={clsx(
                                                            styles.boxChangeQuantity,
                                                        )}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                styles.changeQuantity,
                                                            )}
                                                        >
                                                            <button
                                                                className={clsx(
                                                                    styles.controlQuantity,
                                                                    styles.controlLeft,
                                                                )}
                                                                onClick={handleDecreaseQuantity}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                required
                                                                name="qtyProduct"
                                                                value={quantity}
                                                                onChange={e => handleChangeQuantityWithKeyboard(e)}
                                                                onBlur={e => handleBlurQuantity(e)}
                                                            />
                                                            <button
                                                                className={clsx(
                                                                    styles.controlQuantity,
                                                                    styles.controlRight,
                                                                )}
                                                                onClick={handleIncreaseQuantity}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span>x ${convertPriceInt(itemCart.productDetailSelected?.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={clsx(styles.itemRight)}>
                                                <span
                                                    onClick={handleDeleteItemCart}
                                                
                                                >
                                                    <i className="fa-solid fa-xmark"></i>
                                                </span>
                                                <span className={clsx(styles.priceProduct)}>
                                                    ${calcTotalItemCart()}
                                                </span>
                                            </div>
                                        </div>
            :
            <></>

        
    );
};

export default ItemCart;