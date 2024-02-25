import { combineReducers } from "@reduxjs/toolkit";
import { ingredientReducers, ingredientSlice } from "./slices/ingredientSlice";
import {routeReducers, routerSlice} from "./slices/routerSlice";

export const rootReducers = combineReducers({
  [ingredientSlice.name]: ingredientReducers,
  [routerSlice.name]: routeReducers,
});
