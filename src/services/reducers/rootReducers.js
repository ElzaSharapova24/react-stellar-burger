import {combineReducers} from "@reduxjs/toolkit";
import {ingredientReducers, ingredientSlice} from "../getIngredient/ingredientSlice";
import {
  constructorIngredientReducer,
  constructorIngredientSlice
} from "../constructorIngredient/constructorIngredientSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientReducers,
  [constructorIngredientSlice.name]: constructorIngredientReducer,
})
