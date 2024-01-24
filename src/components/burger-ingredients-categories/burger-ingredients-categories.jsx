import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {useState} from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-categories.module.css"

export default function BurgerIngredientsCategories (props) {
  // const [modalIngridient, setModalIngridient] = useState(null);
  // const closeModalIngredient = () => {
  //   setModalIngridient(null)
  // }
  return props.ingredients.map(ingredient => {
    return <div>
      <h2>
        {ingredient.type}
      </h2>
      <article>
        <img alt={ingredient.name} src={ingredient.image}/>
        <div className={clsx(styles.info)}>
          <p className={clsx(styles.price, "text text_type_digits-default mr-2")}>{ingredient.price}<CurrencyIcon type="primary" /></p>
          <p className={clsx("text")}>{ingredient.name}</p>
        </div>
      </article>
    </div>
  })
}
