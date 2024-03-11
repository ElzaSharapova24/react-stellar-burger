import {createSlice} from "@reduxjs/toolkit";
import {TOrderState} from "../../types/api-types";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../middleware/actions";

export const sliceName = "order";

const initialState:TOrderState = {
    orders: [],
    isLoading: false,
    errorCode: null
}

export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wsConnecting, (state: TOrderState) => {
                state.isLoading = true;
            })

            .addCase(wsOpen, (state: TOrderState) => {
                state.isLoading = false;
            })

            .addCase(wsClose, (state: TOrderState) => {
                state.isLoading = false;
                state.errorCode = null;
            })

            .addCase(wsError, (state : TOrderState, action) => {
                state.errorCode = action.payload;
                state.isLoading = false;
            })

            .addCase(wsMessage, (state:TOrderState, action) => {
                state.orders = action.payload.orders;
                state.isLoading = false;
                state.errorCode = null;
            })

    }


})




export const orderReducer = orderSlice.reducer
