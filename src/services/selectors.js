import {ingredientSlice} from "./getIngredient/ingredientSlice";

export const getIngredients = store => store[ingredientSlice.name];
export const getIngredientsIsLoading = store => store[ingredientSlice.name].isLoading;
