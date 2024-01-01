import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './slices/listStoresSlice';
import productReducer from './slices/listProductsSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import headerStateReducer from './slices/headerStateSlice';
import popupQuickViewProduct from './slices/popupQuickViewProduct';
import userLogin from './slices/userLogin';
import cartReducer from "./slices/cartSlice"
import couponReducer from "./slices/coupon"
import infoCheckoutReducer from "./slices/infoCheckoutSlice"

export const store = configureStore({
    reducer: {
        stores: storeReducer,
        products: productReducer,
        wishlist: wishlistReducer,
        compare: compareReducer,
        headerStates: headerStateReducer,
        popupProduct: popupQuickViewProduct,
        userLogin: userLogin,
        cart: cartReducer,
        coupon: couponReducer,
        infoCheckout: infoCheckoutReducer
    },
});
