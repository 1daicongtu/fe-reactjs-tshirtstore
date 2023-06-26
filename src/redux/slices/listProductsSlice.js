import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProduct = createAsyncThunk('fetchProducts', async () => {
    const res = await axios.get('http://localhost:5000/products/all-product');
    return res && res.status === 200 ? res.data : [];
});

const initialState = {
    isLoading: false,
    isError: false,
    listProduct: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listProduct = action.payload;
            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});
export default productSlice.reducer;
