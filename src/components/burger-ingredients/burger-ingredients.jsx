import clsx from "clsx";
import styles from "./burger-ingredients.module.css";
import React from "react";
// import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import {categoriesNames} from "../../utils/utils";

function BurgerIngredients({
  setModalIsActive,
  setModalItem,
  ingredients,
  name,
}) {
  return (
    <div id={name}>
      <h2 id={name}>{categoriesNames[name]}</h2>
      <div className={clsx(styles.card)}>
        {ingredients &&
          ingredients.map((ingredient) => (
            <BurgerIngredient
              {...ingredient}
              key={ingredient._id}
              onClick={() => {
                setModalIsActive(true);
                setModalItem(ingredient);
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
