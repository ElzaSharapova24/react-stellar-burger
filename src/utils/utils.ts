import {ErrorResponse} from "../types/api-types";
import {IngredientsDto} from "../types/slice-types";

interface CategoriesNames {
  // bun: string;
  // main: string;
  // sauce: string;
  [name: string]: string,
}

const categoriesNames: CategoriesNames = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соусы",
};

export type IngredientsByCategory = {
    // bun: string;
    // main: string;
    // sauce: string;
    [name: string]: IngredientsDto[],
}


function checkResponse<T>(res: Response): Promise<T | ErrorResponse> {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject<ErrorResponse>({ statusCode: res.status });
}



export { categoriesNames, checkResponse };
