import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './slices/listStoresSlice';
import productReducer from './slices/listProductsSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import headerStateReducer from './slices/headerStateSlice';

export const store = configureStore({
    reducer: {
        stores: storeReducer,
        products: productReducer,
        wishlist: wishlistReducer,
        compare: compareReducer,
        headerStates: headerStateReducer
    },
});
