import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: true,
    isError: false,
    listStore: [],
};

export const fetchAllStores = createAsyncThunk('fetchListStores', async () => {
    const res = await axios.get(process.env.REACT_APP_PROXY + '/stores/all-store');
    return res && res.status === 200 ? res.data : [];
});

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStores.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllStores.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.listStore = action.payload;
            })
            .addCase(fetchAllStores.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default storesSlice.reducer;
