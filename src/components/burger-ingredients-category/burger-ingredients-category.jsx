import clsx from "clsx";
import styles from "./burger-ingredients-category.module.css";
import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import { categoriesNames } from "../../utils/utils";

function BurgerIngredientsCategory({
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
            />
          ))}
      </div>
    </div>
  );
}

BurgerIngredientsCategory.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredientsCategory;
