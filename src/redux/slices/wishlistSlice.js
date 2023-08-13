import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishLists: [],
    isLoadding: false,
    isError: false,
};
let wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const listIdState = state.wishLists.map(
                (product) => product.productID,
            );
            if (!listIdState.includes(action.payload.productID)) {
                state.wishLists = [...state.wishLists, action.payload];
                localStorage.setItem(
                    process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST,
                    JSON.stringify(state.wishLists),
                );
            }
        },
        removeItemById: (state, action) => {
            state.wishLists = state.wishLists.filter(
                (item) => item.productID !== action.payload,
            );
            localStorage.setItem(
                process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST,
                JSON.stringify(state.wishLists),
            );
        },
        updateWishlistFromLocalStorage: (state, action) => {
            const wishlistFromLocalStorage = JSON.parse(
                localStorage.getItem(
                    process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST,
                ),
            );
            state.wishLists = wishlistFromLocalStorage
                ? wishlistFromLocalStorage
                : [];
        },
    },
});
export const {
    removeItemById,
    addItem,
    increase,
    updateWishlistFromLocalStorage,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
