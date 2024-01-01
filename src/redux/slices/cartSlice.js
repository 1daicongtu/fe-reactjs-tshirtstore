import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToastMessage } from "../../components/HeaderComponent/ToastMessage"
import axios from "axios"

export const addCartItemToServer = createAsyncThunk(
    "cart/addCartItemToServer",
    async(userID, {rejectWithValue, dispatch})=>{
        
        const cartList = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART)) || [];
        if (cartList.length == 0) {
            dispatch(getCartListByUserID(userID))
            return rejectWithValue("Cart is empty");
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/cart/add-many`, {
                cartList,
                userID
            })
            localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART)
            
            dispatch(getCartListByUserID(userID))

            return res.data
        } catch (error) {
            return rejectWithValue("Invalid cart list to insert!")
        }
    }
)
export const getCartListByUserID = createAsyncThunk(
    "cart/getCartListByUserID",
    async(userID, {rejectWithValue})=>{
      
        if (!userID) {
            return rejectWithValue("Invalid userID");
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_PROXY}/cart/get-all-by-userID`, {
                params: {
                    userID
                }
            })
           
            return res.data.cartList
        } catch (error) {   
            return [];
        }
    }
)
export const updateCartItemToServer = createAsyncThunk(
    "cart/updateCartItemToServer",
    async(data, {rejectWithValue, dispatch})=>{
       
        // userID, productID, colorSelected, sizeSelected, typeName, quantity
        if (!data.userID || !data.productID || !data.colorSelected || !data.sizeSelected || !data.productDetailSelected?.typeName || !data.quantity) {
            return rejectWithValue("Invalid item cart to update!");
        }
        try {
            const editInput = {
                userID: data.userID,
                productID: data.productID,
                colorSelected: data.colorSelected,
                sizeSelected: data.sizeSelected,
                typeName: data.productDetailSelected?.typeName,
                quantity: data.quantity
            }
            const res = await axios.patch(`${process.env.REACT_APP_PROXY}/cart/update-quantity`, {
                ...editInput
            })
            dispatch(updateCartWithoutSaveLocalStorage(data))
            return res.data;   

        } catch (error) {
            return rejectWithValue("Invalid item cart to update!")
        }
    }
)
export const deleteItemCartToServer = createAsyncThunk(
    "cart/deleteItemCartToServer",
    async(data, {rejectWithValue, dispatch})=>{
        try {
            const res = await axios.delete(`${process.env.REACT_APP_PROXY}/cart/delete-one`, {
                params: {
                    ...data
                }
            })
            dispatch(removeCartWithoutSaveLocalStorage(data))
            return res.data;
        } catch (error) {
            return rejectWithValue("Invalid item cart to delete!")
        }
    }
)

export const addOneItemCartToServer = createAsyncThunk(
    "cart/deleteAllItemCartToServer",
    async(data, {rejectWithValue, dispatch})=>{
        const {userID, productID, colorSelected, sizeSelected, quantity, productDetailSelected} = data;
        if (!userID || !productID || !colorSelected || !sizeSelected || !productDetailSelected || !productDetailSelected?.typeName || !quantity) {
            return rejectWithValue("Invalid item cart to insert!");
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/cart/add-one`, {
                ...data
            })
            
            dispatch(addCartWithoutSaveLocalStorage(data))

            return res.data
        } catch (error) {
            return rejectWithValue("Invalid item cart to insert!")
        }
    }
)

const initialValue = {
    cart: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    voucher: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialValue,
    reducers: {
        addCart: (state, action) => {
            console.log("Add cart")
            let isContain = false
            isContain = state.cart.some((item)=>{
                return (
                    item.productID == action.payload.productID
                    && 
                    item.sizeSelected == action.payload.sizeSelected
                    && 
                    item.colorSelected == action.payload.colorSelected
                    && 
                    item.productDetailSelected?.typeName == action.payload.productDetailSelected?.typeName
                )
            })
            if (!isContain) {
                state.cart = [...state.cart, action.payload]
                localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART, JSON.stringify(state.cart))
                addToastMessage({title: "Success", message: "Add to cart successfully", type: "success"})
            } else {
                addToastMessage({title: "Error", message: "This product with style, size, color is already in cart", type: "error"})
            }
        },
        addCartWithoutSaveLocalStorage: (state, action) => {
            let itemContain = state.cart.find(item=>{
                return (
                    item.productID == action.payload.productID
                    && 
                    item.sizeSelected == action.payload.sizeSelected
                    && 
                    item.colorSelected == action.payload.colorSelected
                    && 
                    item.productDetailSelected?.typeName == action.payload.productDetailSelected?.typeName
                )
            })
            if (!itemContain) {
                state.cart = [...state.cart, action.payload]
            } else {
                state.cart = state.cart.map(item=>{
                    if (
                        item.productID == action.payload.productID
                        && 
                        item.sizeSelected == action.payload.sizeSelected
                        && 
                        item.colorSelected == action.payload.colorSelected
                        && 
                        item.productDetailSelected?.typeName == action.payload.productDetailSelected?.typeName
                    ) {
                        return {
                            ...item,
                            quantity: item.quantity + action.payload.quantity
                        }
                    } else {
                        return item;
                    }
                })
            }
            addToastMessage({title: "Success", message: "Add to cart successfully", type: "success"})
        }
        ,
        removeCart: (state, action) => {
            console.log("remove cart")
            state.cart = deleteCartRoot(state.cart, action.payload);
            localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART, JSON.stringify(state.cart))
        },
        removeCartWithoutSaveLocalStorage: (state, action) => {
            state.cart = deleteCartRoot(state.cart, action.payload);
        }
        ,
        updateCart: (state, action) => {
            console.log("update cart")
            if (localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART) == null 
                || localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART)?.length == 0
            ) {
                return;
            }
            state.cart = updateCartRoot(state.cart, action.payload);
            localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART, JSON.stringify(state.cart))
        },
        updateCartWithoutSaveLocalStorage: (state, action) => {
            state.cart = updateCartRoot(state.cart, action.payload);
        }
        ,
        updateCartFromLocalStorage: (state, action) => {
            const cart = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_CART)) || []

            state.cart = cart;
        },
        setVoucher: (state, action)=>{
            state.voucher = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(addCartItemToServer.pending, (state, action)=>{

            })
            .addCase(addCartItemToServer.fulfilled, (state, action)=>{

            })
            .addCase(addCartItemToServer.rejected, (state, action)=>{

            })
            .addCase(getCartListByUserID.pending, (state, action)=>{
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getCartListByUserID.fulfilled, (state, action)=>{
               
                state.isLoading = false;
                state.cart = action.payload;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(getCartListByUserID.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.cart = [];
            })
            .addCase(updateCartItemToServer.pending, (state, action)=>{

            })
            .addCase(updateCartItemToServer.fulfilled, (state, action)=>{
                
            })
            .addCase(updateCartItemToServer.rejected, (state, action)=>{

            })
            .addCase(deleteItemCartToServer.fulfilled, (state, aciton)=>{
                
            })
    }

})

export const { addCart, removeCart, updateCart, updateCartFromLocalStorage
    , updateCartWithoutSaveLocalStorage, removeCartWithoutSaveLocalStorage, 
    addCartWithoutSaveLocalStorage, setVoucher } = cartSlice.actions
export default cartSlice.reducer



const updateCartRoot = (carts, cart)=>{
    return carts.map((item)=>{
        if (
                item.productID == cart.productID 
            && item.sizeSelected == cart.sizeSelected
            && item.colorSelected == cart.colorSelected
            && item.productDetailSelected?.typeName == cart.productDetailSelected?.typeName   
        ){
            return {
                ...item,
                quantity: cart.quantity
            }
        } else {
            return item;
        }
    })
}

const deleteCartRoot = (carts, cart)=>{
    return carts.filter((item)=>{
        return (
            item.productID != cart.productID 
            ||
            item.sizeSelected != cart.sizeSelected
            ||
            item.colorSelected != cart.colorSelected
            ||
            item.productDetailSelected?.typeName != cart.typeName
        )
    })
}