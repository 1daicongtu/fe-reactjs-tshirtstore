import { CreateSliceOptions, createSlice } from "@reduxjs/toolkit";


const initialState = {
    wistList: false,
    cartList: false,
    search: false,
    compareList: false,
    loginRegistry: false,
    mobileNavbar: false
}

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
        setLoginRegistry: (state, action) => {
            state.loginRegistry = action.payload;
        },
        setMobileNavbar: (state, action) => {
            state.mobileNavbar = action.payload;
        }
    }
})

export const {setWistList, setCartList, setSearch, setCompareList, setLoginRegistry, setMobileNavbar} = headerStateSlice.actions;
export default headerStateSlice.reducer;