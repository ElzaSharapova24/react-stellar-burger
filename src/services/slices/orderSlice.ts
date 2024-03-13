import {createSlice} from "@reduxjs/toolkit";
import {TOrderState} from "../../types/api-types";
import {TWsActions} from "../../types/webSocket-types";
import {currentUserOrdersActions, ordersAllActions} from "../middleware/actions";

function sliceFactory(name: string, actions: TWsActions){
    const {wsClose, wsConnecting, wsError, wsMessage, wsOpen} = actions;
    return createSlice({
        name: name,
        initialState: {
            orders: [],
            isLoading: false,
            errorCode: null,
            total: 0,
            totalToday: 0,
        },
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
                    state.total = action.payload.total;
                    state.totalToday = action.payload.totalToday;
                    state.isLoading = false;
                    state.errorCode = null;
                })

        }
    })
}

export const orderSlice = sliceFactory("order", ordersAllActions);
export const orderReducer = orderSlice.reducer

export const currentUserOrderSlice = sliceFactory("currentUserOrder", currentUserOrdersActions);
export const currentUserOrderReducer = currentUserOrderSlice.reducer
