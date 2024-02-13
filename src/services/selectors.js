import {ingredientSlice} from "./slices/ingredientSlice";
import {createOrderSlice} from "./slices/createOrderSlice";


export const getIngredients = store => store[ingredientSlice.name];
export const createOrder = store => store[createOrderSlice.name];
