import style from "./burger-ingredients.module.css";

import clsx from "clsx";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsCategories from "../burger-ingredients-categories/burger-ingredients-categories";
import BurgerIngredientsConstructor from "../burger-ingredients-constructor/burger-ingredients-constructor";
import {data} from "../../utils/data";

export default function BurgerIngredients() {
  const categories = data.map(item => item.type);
  const filteredCategories = [...new Set(categories)];
  return (
    <section>
      <div>
        <BurgerIngredientsTabs tabs={filteredCategories}/>
      </div>
      <div className={clsx(style.section)}>
        <BurgerIngredientsCategories {...data}/>
        <BurgerIngredientsConstructor/>
      </div>
    </section>
  )
}
