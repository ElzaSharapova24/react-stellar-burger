import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrderRequest} from "../../utils/api";

const initialState = {
  order: null,
  isLoading: true,
  error: null,
};

export const createOrderResult = createAsyncThunk(
  'order/getOrderResult',
  async function (payload, { rejectWithValue, fulfillWithValue }) {
    try {
      const response = await createOrderRequest(payload.ingredients);
      if (!response.ok) {
        return rejectWithValue({ message: 'Ошибка на стороне сервера' });
      }
      const json = await response.json();
      return fulfillWithValue(json);
    } catch {
      return rejectWithValue({ message: 'Ошибка на стороне сервера' });
    }
  }
);


export const createOrderSlice  = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderResult.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        
      })
      .addCase(createOrderResult.fulfilled,
        (state, action) => {
          state.order = action.payload;
          state.isLoading = false;
        })
      .addCase(createOrderResult.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
})


export const createOrderReducer = createOrderSlice.reducer
