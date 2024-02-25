import { ingredientSlice } from "./slices/ingredientSlice";
import {routerSlice} from "./slices/routerSlice";

export const getIngredients = (store) => store[ingredientSlice.name];
export const getUser = (store) => store[routerSlice.name].data;
export const getIsAuthChecked = (store) => store[routerSlice.name].isAuthChecked;
