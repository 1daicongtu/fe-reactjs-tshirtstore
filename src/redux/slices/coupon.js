import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCouponNotExpired = createAsyncThunk(
    "coupon/getAllCouponNotExpired",
    async (params, thunkAPI) =>{
        try {
            const resp = await axios.get(`${process.env.REACT_APP_PROXY}/coupons`)
            let data = resp.data;
            return data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data?.message);
        }
    }
)

const initialState = {
    couponList: [],
    isSuccess: true,
    isError: false,
    isLoadding: false,
}

const couponSlice = createSlice({
    name: "couponSlice",
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder.addCase(getAllCouponNotExpired.pending, (state, action) => {
            state.isSuccess = false
            state.isLoadding = true
            state.isError = false

        })
        builder.addCase(getAllCouponNotExpired.fulfilled, (state, action) => {
            state.isLoadding = false;
            state.isSuccess = true;
            const newData = action.payload.map(item => {
                return {
                    ...item, 
                    endDate: item.endDate == null ? null : new Date(item.endDate)
                }
            })
            state.couponList = newData;
        })
        builder.addCase(getAllCouponNotExpired.rejected, (state, action) => {
            state.isLoadding = false;
            state.isError = true;
            state.couponList = []
        })
    }
})

export default couponSlice.reducer
