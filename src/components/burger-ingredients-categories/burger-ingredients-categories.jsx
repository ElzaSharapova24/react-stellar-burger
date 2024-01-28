import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import styles from "./burger-ingredients-categories.module.css"
import React from "react";
import IngredientDetails from "../ingredient-details"

export default function BurgerIngredientsCategories (props) {
  const [modalItem, setModalItem] = React.useState(null);
  const [modalIsActive, setModalIsActive] = React.useState(false);
  
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    return <div>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)}>
        {value.map((item) =>
            <article className={clsx(styles.inner)}>
             <a href="#" className={clsx(styles.link)}>
               <img alt={item.name} src={item.image} onClick={() => {
                 setModalItem(item);
                 setModalIsActive(true);
               }}/>
               <div className={clsx(styles.info)}>
                 <div className={clsx(styles.price)}>
                   <p className={clsx("text text_type_digits-default mr-2", styles.text)}>{item.price}</p>
                   <CurrencyIcon type="primary"/>
                 </div>
                 <p className={clsx("text", styles.text)}>{item.name}</p>
               </div>
             </a>
            </article>
        )}

      </div>
      <IngredientDetails modalItem={modalItem} modalIsActive={modalIsActive} setModalIsActive={setModalIsActive}/>
    </div>
  })
}
