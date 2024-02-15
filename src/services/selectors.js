import { ingredientSlice } from "./slices/ingredientSlice";

export const getIngredients = (store) => store[ingredientSlice.name];
