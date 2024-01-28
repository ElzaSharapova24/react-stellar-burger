import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import styles from "./burger-ingredients.module.css"
import React from "react";
import IngredientDetails from "../ingredient-details"
import PropTypes from "prop-types";

function BurgerIngredients (props) {
  const [modalItem, setModalItem] = React.useState(null);
  const [modalIsActive, setModalIsActive] = React.useState(false);
  
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    return <div key={key}>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)}>
        {value.map((item) =>
            <article className={clsx(styles.inner)} key={item._id}>
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

BurgerIngredients.propTypes = {
  groups: PropTypes.object.isRequired
};

export default BurgerIngredients;
