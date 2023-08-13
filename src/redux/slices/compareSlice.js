import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    compareList: [],
};

let compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addItemToCompareList: (state, action) => {
            const isDuplicate = state.compareList.find(
                (product) => product.productID === action.payload.productID,
            )
            if (isDuplicate){
                return;
            }
            if (state.compareList.length >= 4) {
                state.compareList = [
                    ...state.compareList.slice(1),
                    action.payload,
                ];
            }
            const listId = state.compareList.map(
                (product) => product.productID,
            );
            if (!listId.includes(action.payload.productID)) {
                state.compareList = [...state.compareList, action.payload];
                localStorage.setItem(
                    process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                    JSON.stringify(state.compareList),
                );
            }
        },
        removeItemToCompareList: (state, action) => {
            state.compareList = state.compareList.filter((product) => {
                return product.productID !== action.payload;
            });
            localStorage.setItem(
                process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                JSON.stringify(state.compareList),
            );
        },
        updateItemCompareFromLocalStorage: (state, action) => {
            state.compareList =
                JSON.parse(
                    localStorage.getItem(
                        process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                    ),
                ) || [];
        },
        clearAll: (state) => {
            state.compareList = [];
            localStorage.setItem(
                process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                JSON.stringify(state.compareList),
            );
        },
    },
});
export const {
    addItemToCompareList,
    removeItemToCompareList,
    updateItemCompareFromLocalStorage,
    clearAll,
} = compareSlice.actions;
export default compareSlice.reducer;
