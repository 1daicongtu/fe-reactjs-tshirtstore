import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    country: "Viet Nam",
    streetAddress: "",
    passcode: "",
    companyName: "",
    city: "",
    phone: "",
    note: ""
}

const infoCheckoutSlice = createSlice({
    name: "infoCheckoutSlice",
    initialState: initialState,
    reducers: {
        loadingInfoCheckoutFromLocalStorage: (state, action) => {
            const info = JSON.parse(localStorage.getItem("infoCheckout"));
            if (info){
                state.email = info.email;
                state.firstname = info.firstname;
                state.lastname = info.lastname;
                state.country = info.country;
                state.streetAddress = info.streetAddress;
                state.passcode = info.passcode;
                state.companyName = info.companyName;
                state.city = info.city;
                state.phone = info.phone;
                state.note = info.note;
            }
            

        },
        updateInfoCheckout: (state, action)=>{
            state.email = action.payload.email;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.country = action.payload.country;
            state.streetAddress = action.payload.streetAddress;
            state.passcode = action.payload.passcode;
            state.companyName = action.payload.companyName;
            state.city = action.payload.city;
            state.phone = action.payload.phone;
            state.note = action.payload.note;
            localStorage.setItem("infoCheckout", JSON.stringify(state));
        }
    }
})

export const {loadingInfoCheckoutFromLocalStorage, updateInfoCheckout} = infoCheckoutSlice.actions
export default infoCheckoutSlice.reducer