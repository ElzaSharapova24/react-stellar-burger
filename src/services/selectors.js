import { ingredientSlice } from "./slices/ingredientSlice";
import {sliceName, userSlice} from "./slices/routerSlice";

export const getIngredients = (store) => store[ingredientSlice.name];
export const getUser = (store) => store[userSlice.name].data;
export const getIsAuthChecked = (store) => store[userSlice.name].isAuthChecked;
