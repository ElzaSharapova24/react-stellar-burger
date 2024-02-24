import { combineReducers } from "@reduxjs/toolkit";
import { ingredientReducers, ingredientSlice } from "./slices/ingredientSlice";
import {authCheck, userSlice} from "./slices/routerSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientReducers,
  [userSlice.name]: authCheck,
});
