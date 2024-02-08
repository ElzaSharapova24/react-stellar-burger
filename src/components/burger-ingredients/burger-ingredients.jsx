import clsx from "clsx";
import styles from "./burger-ingredients.module.css"
import React from "react";
// import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import categoriesNames from "../../utils/utils";

function BurgerIngredients (props) {
  const {setModalIsActive, setModalItem, ingredients, name} = props
  
  return <div id={name}>
    <h2 id={name}>
      {categoriesNames[name]}
    </h2>
    <div className={clsx(styles.card)}>
      {ingredients.map((ingredient) =>
        <BurgerIngredient {...ingredient} onClick={() => {
          setModalItem(ingredient);
          setModalIsActive(true);
        }} key={ingredient._id}/>
      )}
    </div>
  </div>
  
  // return Object.keys(categories).map(key => {
  //   const value = categories[key];
  //   return <div key={key} id={key}>
  //     <h2 id={key}>
  //       {categoriesNames[key]}
  //     </h2>
  //     <div className={clsx(styles.card)} key={key}>
  //       {value.map((ingredient) =>
  //         <BurgerIngredient {...ingredient} onClick={() => {
  //           setModalItem(ingredient);
  //           setModalIsActive(true);
  //         }} key={ingredient._id}/>
  //       )}
  //     </div>
  //   </div>
  // })
  
  
}

export default BurgerIngredients;
