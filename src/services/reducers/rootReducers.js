import {combineReducers} from "@reduxjs/toolkit";
import {ingredientReducers, ingredientSlice} from "../slices/ingredientSlice";
import {createOrderReducer, createOrderSlice} from "../slices/createOrderSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientReducers,
  [createOrderSlice.name]: createOrderReducer
})
