import style from "./burger-ingredients.module.css";

import clsx from "clsx";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";

export default function BurgerIngredients() {
  return (
    <section>
      <h1 className={clsx("text text_type_main-large")}>
        Соберите бургер
      </h1>
      <div>
        <BurgerIngredientsTabs/>
      </div>
    </section>
  )
}
