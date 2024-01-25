import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-categories.module.css"

export default function BurgerIngredientsCategories (props) {
  // const [modalIngridient, setModalIngridient] = useState(null);
  // const closeModalIngredient = () => {
  //   setModalIngridient(null)
  // }
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    return <div>
      <h2>
        {key}
      </h2>
      <div className={clsx(styles.card)}>
        {value.map((item) =>
          <article>
            <img alt={item.name} src={item.image}/>
            <div className={clsx(styles.info)}>
              <p className="text text_type_digits-default mr-2">{item.price}</p>
              <CurrencyIcon type="primary" />
              <p className={clsx("text")}>{item.name}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  })
}
