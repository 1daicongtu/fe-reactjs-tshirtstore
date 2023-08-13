import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import addAccessTokenToHeader from "../../utils/addAccessTokenToHeader";
import { addToastMessage } from "../../components/HeaderComponent/ToastMessage";

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLogin: false,
}

export const login = createAsyncThunk(
    "userLogin",
    async (data, { rejectWithValue }) => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/auth/login`, data)
            
            if (res.status == 200){
                const {refreshToken, accessToken} = res.data;
               
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);

                addAccessTokenToHeader();

            } 
            return res.data;
        } catch (error) {
            
            addToastMessage({title: "Error", message: error.response?.data?.message, type: "error"})
            rejectWithValue(error.response?.data?.message)
        }
    }
)
export const requestNewAccessToken = createAsyncThunk(
    "requestNewAccessToken",
    async (data, { rejectWithValue }) => {
        try{
            // don't need to dispatch this action, because it will be dispatched automatically when open the app or token is expired
            const refreshToken = sessionStorage.getItem("refreshToken");
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/auth/refresh-token`, {refreshToken})

            
            if (res.status == 200){
                const {refreshToken, accessToken} = res.data;

                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);

                addAccessTokenToHeader();

            } 

            return res.data;
        } catch (error) {
            
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

        }
    }
)

const userLoginSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
        logout: (state, action) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            state.user = null
            state.isLogin = false
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (build) =>{
        build
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.isLogin = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                if (action.payload?.user){
                    state.isSuccess = true
                    state.isLogin = true
                }
                state.user = action.payload?.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.isLogin = false
            })
            .addCase(requestNewAccessToken.fulfilled, (state, action) => {
                if (!action.payload?.accessToken || !action.payload?.refreshToken){
                    state.user = null
                    state.isLogin = false
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = false
                }
            })

    }
})

export default userLoginSlice.reducer;

export const { logout } = userLoginSlice.actions;