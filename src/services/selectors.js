import {ingredientSlice} from "./getIngredient/ingredientSlice";
import {constructorIngredientSlice} from "./constructorIngredient/constructorIngredientSlice";


export const getIngredients = store => store[ingredientSlice.name];
// export const getIngredientsIsLoading = store => store[ingredientSlice.name].isLoading;
export const createOrderSelector = store => store[constructorIngredientSlice.name];
export const createOrderr = store => store[constructorIngredientSlice.getInitialStat];
