import {combineReducers} from "@reduxjs/toolkit";
import {ingredientSlice} from "../getIngredient/ingredientSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
})
