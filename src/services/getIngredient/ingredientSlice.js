import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getIngredientsRequest from "../../utils/api";



const initialState = {
	ingredients: [],
	isLoading: false,
	error: null,
};


export const getIngredientsFetch = createAsyncThunk(
  'ingredients/getIngredientsFetch',
  async function (_, { rejectWithValue, fulfillWithValue }) {
    try {
      const response = await getIngredientsRequest();
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


export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers:{
  
  },
  extraReducers: (builder) => {
    builder
    .addCase(getIngredientsFetch.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      
    })
      .addCase(getIngredientsFetch.fulfilled,
        (state, action) => {
          const { data } = action.payload;
          state.ingredients = data;
          state.isLoading = false;
        })
      .addCase(getIngredientsFetch.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
})


