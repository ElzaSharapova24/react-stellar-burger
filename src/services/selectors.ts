import {ingredientSlice, IngredientState} from "./slices/ingredientSlice";
import { routerSlice } from "./slices/routerSlice";
import { RootStore } from "./hooks";
import {orderSlice} from "./slices/orderSlice";

export const getIngredients = (store: RootStore) => store[ingredientSlice.name] as IngredientState;
export const getAuthData = (store: RootStore) => store[routerSlice.name].authData;
export const getIsAuthChecked = (store: RootStore) => store[routerSlice.name].isAuthChecked;
export const getOrder = (store: RootStore) => store[orderSlice.name];
