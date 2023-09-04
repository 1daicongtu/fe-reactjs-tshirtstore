import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ReactReduxContext } from 'react-redux';


export const addWishlistToServer = createAsyncThunk(
    'wishlist/addWishlistToServer',
    async (userID, {rejectWithValue, dispatch}) => {
        const wishlist = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST)) || [];
        
        if (!wishlist || wishlist.length === 0) {
            // getAllWishlistByUserID
            dispatch(getAllWishlistByUserID(userID))
            return rejectWithValue({
                message: 'Wishlist is empty',
            })
        }
        
        try {
            const productList = wishlist.map((item) => item._id);
       
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/wishlist/add-many`, {
                userID, 
                wishlist: productList
            })
           
            // getAllWishlistByUserID
            dispatch(getAllWishlistByUserID(userID))
            // remove all wishlist in localstorage
            localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST)
            return res.data
        } catch (error) {
          
           return rejectWithValue("Error when insert many wishlist to server")
        }
    }
)

export const addOneWishlistToServer = createAsyncThunk(
    'wishlist/addOneWishlistToServer',
    async (data, {rejectWithValue, dispatch})=>{
        const {userID, product} = data;

        try {
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/wishlist/add-one`, {
                userID : userID, 
                productObjectId : product._id
            })
          
            if (result.data?.success){ 
             
                dispatch(addItemWishWithoutSaveLocalStorage(product));
                return result.data
            }
            return rejectWithValue(result.data.message);
        } catch (error) {
            
            return rejectWithValue("Error when add item to wishlist")
        }
    }
)

export const getAllWishlistByUserID = createAsyncThunk(
    'wishlist/getAllWishlistByUserID',
    async (userID, {rejectWithValue}) =>{
        if (!userID) {
            return rejectWithValue("User ID is required")
        }
        try {
            const result = await axios.get(`${process.env.REACT_APP_PROXY}/wishlist/get-all-by-userID`,{
                params: {
                    userID
                }
            })
           
            return result.data.wishlists;
        } catch (error) {
            return rejectWithValue("Error when get all wishlist by userID")
        }
    }
)
export const deleteItemInWistListByProductID = createAsyncThunk(
    'wishlist/deleteItemInWistListByProductID',
    async (data, {rejectWithValue, dispatch}) =>{
        const {userID, productObjectId, productID} = data;
        if (!productObjectId) {
            return rejectWithValue("Product ID is required")
        }
       
        try {
            const result = await axios.delete(`${process.env.REACT_APP_PROXY}/wishlist`,{
                params: {
                    userID,
                    productObjectId,
    
                }
            })
            if (result.data?.success){
                
                // getAllWishlistByUserID
                dispatch(removeItemByIdWithoutStoreLocalStorage(productID))

                return result.data;
            }
            return rejectWithValue("Error when delete item in wishlist by productID");

        } catch (error) {
            return rejectWithValue("Error when delete item in wishlist by productID");
        }
    }
)

const removeItemWishlishRoot = (wishlist, productId)=>{
    if (!wishlist || wishlist.length === 0) {
        return [];
    }
    return wishlist.filter(
        (item) => item.productID !== productId,
    );
}

const initialState = {
    wishLists: [],
    isLoadding: false,
    isError: false,
    isSuccess: true,
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
        addItemWishWithoutSaveLocalStorage: (state, action) => {
            const listIdState = state.wishLists.map(
                (product) => product.productID,
            );
            if (!listIdState.includes(action.payload.productID)) {
                state.wishLists = [...state.wishLists, action.payload];
             
            }
        },
        removeItemById: (state, action) => {
            state.wishLists = removeItemWishlishRoot(state.wishLists, action.payload);
            localStorage.setItem(
                process.env.REACT_APP_LOCALSTORAGE_KEY_WISHLIST,
                JSON.stringify(state.wishLists),
            );
        },
        removeItemByIdWithoutStoreLocalStorage: (state, action) => {   
            state.wishLists = removeItemWishlishRoot(state.wishLists, action.payload);
        } 
        ,
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
    extraReducers: (builder) =>{
        builder
            .addCase(addWishlistToServer.pending, (state, action) => {
                state.isLoadding = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(addWishlistToServer.fulfilled, (state, action) => {
                state.isLoadding = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(addWishlistToServer.rejected, (state, action) => {
                state.isLoadding = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllWishlistByUserID.pending, (state, action) => {
                state.isLoadding = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllWishlistByUserID.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoadding = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishLists = action.payload?.[0]?.products;
            })
            .addCase(getAllWishlistByUserID.rejected, (state, action) => {
                state.isLoadding = false;
                state.isError = true;
                state.isSuccess = false;
            })
    } 
});
export const {
    removeItemById,
    addItem,
    increase,
    updateWishlistFromLocalStorage,
    removeItemByIdWithoutStoreLocalStorage,
    addItemWishWithoutSaveLocalStorage
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
