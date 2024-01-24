import styles from "./burger-ingredients.module.css";

import clsx from "clsx";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsCategories from "../burger-ingredients-categories/burger-ingredients-categories";
import BurgerIngredientsConstructor from "../burger-ingredients-constructor/burger-ingredients-constructor";
import {data} from "../../utils/data";

export default function BurgerIngredients() {
  console.log(data);
  const categories = data.map(item => item.type);
  const filteredCategories = [...new Set(categories)];
  return (
    <section>
        <BurgerIngredientsTabs tabs={filteredCategories}/>
      <div className={clsx(styles.wrapper, "custom-scroll")}>
        <div className={clsx(styles.categories, "custom-scroll")}>
          <BurgerIngredientsCategories ingredients={data}/>
        </div>
        <div>
          <BurgerIngredientsConstructor/>
        </div>
      </div>
    </section>
  )
}
