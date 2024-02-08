import {combineReducers} from "@reduxjs/toolkit";
import {ingredientSlice} from "../getIngredient/ingredientSlice";
import {
  constructorIngredientReducer,
  constructorIngredientSlice
} from "../constructorIngredient/constructorIngredientSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  // [constructorIngredientSlice.name]: constructorIngredientReducer,
})
