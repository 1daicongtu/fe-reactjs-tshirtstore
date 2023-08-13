import { CreateSliceOptions, createSlice } from '@reduxjs/toolkit';

const initialState = {
    wistList: false,
    cartList: false,
    search: false,
    compareList: false,
    login: false,
    mobileNavbar: false,
    register: false,
};

const headerStateSlice = createSlice({
    name: 'headerState',
    initialState,
    reducers: {
        setWistList: (state, action) => {
            state.wistList = action.payload;
        },
        setCartList: (state, action) => {
            state.cartList = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCompareList: (state, action) => {
            state.compareList = action.payload;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setMobileNavbar: (state, action) => {
            state.mobileNavbar = action.payload;
        },
        setRegister: (state, action) => {
            state.register = action.payload;
        }
    },
});

export const {
    setWistList,
    setCartList,
    setSearch,
    setCompareList,
    setLogin,
    setMobileNavbar,
    setRegister,
} = headerStateSlice.actions;
export default headerStateSlice.reducer;
