import { ingredientSlice } from "./slices/ingredientSlice";
import {routerSlice} from "./slices/routerSlice";

export const getIngredients = (store) => store[ingredientSlice.name];
export const getAuthData = (store) => store[routerSlice.name].authData;
export const getIsAuthChecked = (store) => store[routerSlice.name].isAuthChecked;
