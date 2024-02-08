import clsx from "clsx";
import styles from "./burger-ingredients.module.css"
import React from "react";
// import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";

function BurgerIngredients (props) {
  const {setModalIsActive, setModalItem, ingredients, _id} = props
  
  return Object.keys(ingredients).map(key => {
    const value = ingredients[key];
    return <div key={key}>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)} key={key}>
        {value.map((ingredient) =>
          <BurgerIngredient {...ingredient} onClick={() => {
            setModalItem(ingredient);
            setModalIsActive(true);
          }} key={ingredient._id}/>
        )}
      </div>
    </div>
  })
  
  
}

export default BurgerIngredients;
