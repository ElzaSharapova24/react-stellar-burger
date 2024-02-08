// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {createOrderRequest} from "../../utils/api";
//
//
// const initialState = {
//   createOrder: [],
//   orderNumber: 0
// }
//
// export const getOrderFetch = createAsyncThunk(
//   'ingredients/getOrderFetch',
//   async function (_, { rejectWithValue, fulfillWithValue }, ) {
//     try {
//       const response = await createOrderRequest();
//       if (!response.ok) {
//         return rejectWithValue({ message: 'Ошибка на стороне сервера' });
//       }
//       const json = await response.json();
//       console.log(json)
//       return fulfillWithValue(json);
//     } catch {
//       return rejectWithValue({ message: 'Ошибка на стороне сервера' });
//     }
//   }
// );
//
// export const constructorIngredientSlice = createSlice({
//   name: 'constructorIngredient',
//   initialState,
//   reducers: {
//     createOrderPending(state) {
//       state.createOrder = "pending";
//     },
//     createOrderSuccess(state, action) {
//       state.createOrder = "success";
//       state.orderNumber = action.payload.orderNumber;
//     },
//     createOrderFailed(state) {
//       state.createOrder = "failed";
//     },
//     addFilling(state, action) {
//       const filling = action.payload;
//       state.constructorIngredient.push(filling)
//     },
//     removeFilling(state, action) {
//       state.constructorIngredient = state.constructorIngredient.filter((_, index) => index !== action.payload)
//     },
//   },
// })
//
//
//
// export const {
//   addBun,
//   addFilling,
//   removeFilling,} = constructorIngredientSlice.actions
//
// export const constructorIngredientReducer = constructorIngredientSlice.reducer
