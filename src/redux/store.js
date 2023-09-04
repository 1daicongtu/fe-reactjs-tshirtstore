import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './slices/listStoresSlice';
import productReducer from './slices/listProductsSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import headerStateReducer from './slices/headerStateSlice';
import popupQuickViewProduct from './slices/popupQuickViewProduct';
import userReducer from './slices/userLogin'
import userLogin from './slices/userLogin';
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
    reducer: {
        stores: storeReducer,
        products: productReducer,
        wishlist: wishlistReducer,
        compare: compareReducer,
        headerStates: headerStateReducer,
        popupProduct: popupQuickViewProduct,
        userLogin: userLogin,
        cart: cartReducer
    },
});
