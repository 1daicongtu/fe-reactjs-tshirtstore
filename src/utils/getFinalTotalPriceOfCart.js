export default function getFinalTotalPriceOfCart(totalPrice, coupon) {
    
    let newTotalPrice = totalPrice >= process.env.REACT_APP_STANDARD_FREESHIPPING_COST
    ? totalPrice - 0 : totalPrice - 0 + (process.env.REACT_APP_SHIPPING_FEE - 0);
    if (coupon){
        if (coupon.discountType == "percent"){
            newTotalPrice = newTotalPrice * (100 - coupon.discount) / 100;
        } else if (coupon.discountType == "money"){
            newTotalPrice = newTotalPrice - coupon.discount;
        } else if (coupon.discountType == "ship fee" && totalPrice < process.env.REACT_APP_STANDARD_FREESHIPPING_COST ){
            newTotalPrice = coupon.discount >= process.env.REACT_APP_SHIPPING_FEE - 0 ? newTotalPrice : newTotalPrice - coupon.discount;
        }
    }
 
    return newTotalPrice;
}