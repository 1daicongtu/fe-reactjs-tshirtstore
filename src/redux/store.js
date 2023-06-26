import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './slices/listStoresSlice';
import productReducer from './slices/listProductsSlice';

export const store = configureStore({
    reducer: {
        stores: storeReducer,
        products: productReducer,
    },
});
