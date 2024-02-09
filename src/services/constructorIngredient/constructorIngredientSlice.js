import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrderRequest} from "../../utils/api";


const initialState = {
  orderNumber: 0
}

export const constructorIngredientSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    createOrderPending(state) {
      state.createOrder = "pending";
    },
    createOrderSuccess(state, action) {
      state.createOrder = "success";
      state.orderNumber = action.payload.orderNumber;
    },
    createOrderFailed(state) {
      state.createOrder = "failed";
    },
    // removeFilling(state, action) {
    //   state.constructorIngredient = state.constructorIngredient.filter((_, index) => index !== action.payload)
    // },
  },
})



export const {
  removeFilling, createOrderPending} = constructorIngredientSlice.actions

export const constructorIngredientReducer = constructorIngredientSlice.reducer
