import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderRequest, getIngredientsRequest } from "../../utils/api";
import {checkResponse} from "../../utils/utils";

const initialState = {
  bun: null,
  fillings: [],
  ingredients: [],
  isLoading: true,
  error: null,
  order: null,
};


export const getIngredientsFetch = createAsyncThunk(
  "ingredients/getIngredientsFetch",
  async function (_) {
    return await getIngredientsRequest().then(checkResponse);
  }
);

export const createOrderResult = createAsyncThunk(
  "order/getOrderResult",
  async function (payload) {
    return await createOrderRequest(payload.ingredients).then(checkResponse)
  }
);

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    dragBun(state, action) {
      if (state.bun !== null) {
        state.ingredients.find((e) => e._id === state.bun._id).count = 0;
      }
      state.ingredients.find((e) => e._id === action.payload._id).count = 2;
      state.bun = action.payload;
    },
    dragFilling(state, action) {
      state.ingredients.find((e) => e._id === action.payload._id).count++;
      state.fillings.push({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },
    ingredientSort(state, action) {
      state.fillings.splice(
        action.payload.to,
        0,
        state.fillings.splice(action.payload.from, 1)[0]
      );
    },
    ingredientDelete(state, action) {
      state.ingredients.find((e) => e._id === action.payload._id).count--;
      state.fillings = state.fillings.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetOrder(state) {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsFetch.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getIngredientsFetch.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.ingredients = data.map((e) => {
          return {
            ...e,
            count: 0,
          };
        });
        state.isLoading = false;
      })

      .addCase(getIngredientsFetch.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(createOrderResult.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })

      .addCase(createOrderResult.fulfilled, (state, action) => {
        state.bun = null;
        state.fillings = [];
        for (let ingredient of state.ingredients) {
          ingredient.count = 0;
        }
        state.order = action.payload;
        state.isLoading = false;
      })

      .addCase(createOrderResult.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const {
  dragBun,
  dragFilling,
  ingredientSort,
  ingredientDelete,
  resetOrder,
} = ingredientSlice.actions;

export const ingredientReducers = ingredientSlice.reducer;
