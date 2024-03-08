import {createSlice} from "@reduxjs/toolkit";
import {TOrderState} from "../../types/api-types";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../middleware/actions";



const initialState:TOrderState = {
    data: null,
    isLoading: false,
    errorCode: null
}


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wsConnecting, (state) => {
                state.isLoading = true;
            })

            .addCase(wsOpen, (state) => {
                state.isLoading = false;
            })

            .addCase(wsClose, (state) => {

            })

            .addCase(wsError, (state, action) => {
                state.errorCode = action.payload;
                state.isLoading = false;
            })

            .addCase(wsMessage, (state:any, action) => {
                state.data = action.payload;
                console.log(state.data)
            })

    }


})




export const orderReducer = orderSlice.reducer
