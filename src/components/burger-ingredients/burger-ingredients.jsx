import styles from "./burger-ingredients.module.css";

import clsx from "clsx";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsCategories from "../burger-ingredients-categories/burger-ingredients-categories";
import BurgerIngredientsConstructor from "../burger-ingredients-constructor/burger-ingredients-constructor";
import {data} from "../../utils/data";


export default function BurgerIngredients() {
  const categories = data.map(item => item.type);
  const filteredCategories = [...new Set(categories)];
  console.log(data)
  
  const groups = data.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
  return (
    <section>
        <BurgerIngredientsTabs tabs={filteredCategories}/>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.scroll, "custom-scroll")}>
          <BurgerIngredientsCategories groups={groups}/>
        </div>
        <div className={clsx(styles.scroll, styles.constructor, "custom-scroll")}>
          <BurgerIngredientsConstructor ingredients = {data}/>
        </div>
      </div>
    </section>
  )
}
