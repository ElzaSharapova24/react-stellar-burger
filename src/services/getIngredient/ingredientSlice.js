import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredientsRequest} from "../../utils/api";


const initialState = {
  bun: null,
  fillings: [],
  // totalPrice: 0,
	ingredients: [],
	isLoading: true,
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
    // dragBun(state, action){
    //   const dragged = state.ingredients.filter(element => element._id === action.payload)[0];
    //   state.ingredients = state.ingredients.filter(element => element !== dragged);
    //   state.draggedIngredients = state.draggedIngredients.concat([dragged]);
    // },
    // dragFilling(state, action){
    //   const dragged = state.ingredients.filter(element => element._id === action.payload)[0];
    //   state.ingredients = state.ingredients.filter(element => element !== dragged);
    //   state.draggedIngredients = state.draggedIngredients.concat([dragged]);
    // },
    dragBun(state, action){
      if (state.bun !== null){
        state.ingredients.find(e => e._id === state.bun._id).count = 0;
      }
      state.ingredients.find(e => e._id === action.payload._id).count = 2;
      state.bun = action.payload;
    },
    dragFilling(state, action){
      state.ingredients.find(e => e._id === action.payload._id).count++;
      state.fillings.push({
        ...action.payload,
        id:crypto.randomUUID()
      })
    },
    ingredientSort(state, action) {
      state.fillings.splice(
        action.payload.to,
        0,
        state.fillings.splice(action.payload.from, 1)[0]
      );
    },
    ingredientDelete(state, action) {
      state.ingredients.find(e => e._id === action.payload._id).count--;
      state.fillings = state.fillings.filter(
        item => item.id !== action.payload.id
      )
    }
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
          state.ingredients = data.map(e => {
            return {
              ...e,
              count: 0
            }
          });
          state.isLoading = false;
        })
      .addCase(getIngredientsFetch.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
})

export const { dragBun, dragFilling, ingredientSort, ingredientDelete} = ingredientSlice.actions;

export const ingredientReducers = ingredientSlice.reducer


