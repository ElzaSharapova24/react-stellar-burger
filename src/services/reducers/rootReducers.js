import {combineReducers} from "@reduxjs/toolkit";
import {ingredientReducers, ingredientSlice} from "../slices/ingredientSlice";


export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientReducers,

})
