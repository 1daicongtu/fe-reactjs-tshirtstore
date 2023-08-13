import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: null,
    showPopup: false,
};

const popupQuickViewProduct = createSlice({
    name: 'popupQuickViewProduct',
    initialState,
    reducers: {
        setShowPopup: (state, action) => {
            state.showPopup = action.payload;
        },
        setProductToShow: (state, action) => {
            state.product = action.payload;
        },
    },
});
export const { setShowPopup, setProductToShow } = popupQuickViewProduct.actions;
export default popupQuickViewProduct.reducer;
