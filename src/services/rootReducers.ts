import { combineReducers } from "@reduxjs/toolkit";
import {ingredientReducers, ingredientSlice} from "./slices/ingredientSlice";
import {routerReducers, routerSlice} from "./slices/routerSlice";
import {currentUserOrderReducer, currentUserOrderSlice, orderReducer, orderSlice} from "./slices/orderSlice";

export const rootReducers = combineReducers({
    [ingredientSlice.name]: ingredientReducers,
    [routerSlice.name]: routerReducers,
    [orderSlice.name]: orderReducer,
    [currentUserOrderSlice.name]: currentUserOrderReducer,
});
