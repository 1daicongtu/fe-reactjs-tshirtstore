import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCompareList} from './headerStateSlice';

const initialState = {
    compareList: [],
    isSuccess: true,
    isError: false,
    isLoadding: false,
};

export const addManyToCompareListServer = createAsyncThunk(
    'compare/addManyToCompareListServer',
    async (userID, {rejectWithValue, dispatch, getState}) => {

        if (!userID) {
            return rejectWithValue('userID or productIDList is invalid');
        }

        const compareList = JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE || '[]')
        )

        if (!compareList || !compareList.length) {
            // get all compare from server by dispatch
            dispatch(getAllCompareListServerByUserID(userID));
            return rejectWithValue('compareList is empty');
        }
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/compare/add-many`, {
                userID, 
                productIDList: compareList.map(product => product._id)
            })
            // remove all item in local storage

            localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE);
            dispatch(getAllCompareListServerByUserID(userID));
            return res.data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);

        }
    }
)
export const getAllCompareListServerByUserID = createAsyncThunk(
    'compare/getAllCompareListServerByUserID',
    async (userID, {rejectWithValue}) => {
        if (!userID) {
            return rejectWithValue('userID is invalid');
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_PROXY}/compare/get-compare-by-userID`, {
                params: {
                    userID
                }
            })
            if (!res.data.compares) {
                return [];
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }

    }
)
export const addOneToCompareListServer = createAsyncThunk(
    'compare/addOneToCompareListServer',
    async (data, {rejectWithValue, dispatch}) => {
        const {userID, product} = data;

        if (!userID || !product) {
            return rejectWithValue('userID or product is invalid');
        }
            
        try {
            const res = await axios.post(`${process.env.REACT_APP_PROXY}/compare/add-one`, {
                userID,
                productObjectId: product._id
            })
            dispatch(addOneItemToCompareListWithoutLocalStorage(product))
            dispatch(setCompareList(true))
           
            return res.data;
        } catch (error) {
           
            return rejectWithValue(error.response.data.message);
        }
    }
)
export const removeOneToCompareListServer = createAsyncThunk(
    'compare/removeOneToCompareListServer',
    async (data, {rejectWithValue, dispatch}) => {
        const {userID, productObjectId, productID} = data;
        if (!userID || !productObjectId) {
            return rejectWithValue('userID or productID is invalid');
        }
        try {
            const res = axios.delete(`${process.env.REACT_APP_PROXY}/compare/delete-one-item`, {
                params: {
                    userID,
                    productObjectId
                }
            })
            // remove item without store in local storage
            dispatch(removeItemToCompareListWithoutLocalStorage(productID))
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const removeAllByUserID = createAsyncThunk(
    'compare/removeAllByUserID',
    async (userID, {rejectWithValue, dispatch}) => {
        if (!userID) {
            return rejectWithValue('userID is invalid');
        }
        try {
            const res = await axios.delete(`${process.env.REACT_APP_PROXY}/compare/delete-all-by-userID`, {
                params: {
                    userID
                }
            })
            dispatch(clearAll())
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

const addItemRoot = (compareList, newProduct)=>{
    
    if (!compareList || compareList.length === 0) {
        return [newProduct];
    }
    const isDuplicate = compareList.find(product => 
        product.productID === newProduct.productID    
    )
    if (isDuplicate){
        return compareList;
    }
    if (compareList.length >= 4) {
        return [
            ...compareList.slice(1),
            newProduct,
        ];
    }
    
    return [...compareList, newProduct];
}

const removeItemRoot = (compareList, productID) => {
    if (!compareList || compareList.length === 0) {
        return [];
    }
    return compareList.filter((product) => {
        return product.productID !== productID;
    });
}

let compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addItemToCompareList: (state, action) => {
            
            const newCompareList = addItemRoot(state.compareList, action.payload);
            state.compareList = newCompareList;
            localStorage.setItem( 
                process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                JSON.stringify(newCompareList),
            )
        },
        addOneItemToCompareListWithoutLocalStorage: (state, action) => {
            state.compareList = addItemRoot(state.compareList, action.payload);
        }
        ,
        removeItemToCompareList: (state, action) => {
            state.compareList = removeItemRoot(state.compareList, action.payload);  
            localStorage.setItem(
                process.env.REACT_APP_LOCALSTORAGE_KEY_COMPARE,
                JSON.stringify(state.compareList),
            );
        },
        removeItemToCompareListWithoutLocalStorage: (state, action) => {
            state.compareList = removeItemRoot(state.compareList, action.payload);
        }
        ,
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
    extraReducers: builder => {
        builder.addCase(getAllCompareListServerByUserID.pending, (state, action) => {
            state.isSuccess = false
            state.isLoadding = true
            state.isError = false
        })
        builder.addCase(getAllCompareListServerByUserID.fulfilled, (state, action) => {
            state.isLoadding = false;
            state.isSuccess = true;
            state.compareList = action.payload?.compares?.[0]?.products || [];
            state.isError = false;
        })
        builder.addCase(getAllCompareListServerByUserID.rejected, (state, action) => {
            state.isLoadding = false;
            state.isSuccess = false;
            state.isError = true;

        })
        builder.addCase(addManyToCompareListServer.fulfilled, (state, action) => {
            state.isLoadding = false;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(addManyToCompareListServer.rejected, (state, action) => {
            state.isLoadding = false;
            state.isSuccess = false;
            state.isError = true;
        })
        builder.addCase(addManyToCompareListServer.pending, (state, action) => {
            state.isLoadding = true;
            state.isSuccess = false;
            state.isError = false;
        })
    }
});
export const {
    clearAll,
    addItemToCompareList,
    removeItemToCompareList,
    updateItemCompareFromLocalStorage,
    addOneItemToCompareListWithoutLocalStorage,
    removeItemToCompareListWithoutLocalStorage,
} = compareSlice.actions;
export default compareSlice.reducer;
