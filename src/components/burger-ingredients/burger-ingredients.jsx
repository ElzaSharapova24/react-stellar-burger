import clsx from "clsx";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsCategory from "../burger-ingredients-category";
import React from "react";
import BurgerIngredientsTabs from "../burger-ingredients-tabs";
import PropTypes from "prop-types";

function BurgerIngredients({
  isLoading,
  currentCategories,
  handleTubClick,
  current,
  bunCategory,
  setIngredientModalItem,
  setIngredientModalIsActive,
  mainCategory,
  sauceCategory,
}) {
  return (
    <section className={clsx("custom-scroll", styles.scroll)}>
      {isLoading ? (
        <span className={clsx(styles.loader)}></span>
      ) : (
        <>
          <div className={clsx(styles.tabs)}>
            <BurgerIngredientsTabs
              tabs={currentCategories}
              current={current}
              handleTubClick={handleTubClick}
            />
          </div>
          <div id="bun" ref={bunCategory}>
            <BurgerIngredientsCategory
              name={"bun"}
              ingredients={currentCategories["bun"]}
              setModalItem={setIngredientModalItem}
              setModalIsActive={setIngredientModalIsActive}
            />
          </div>
          <div id="main" ref={mainCategory}>
            <BurgerIngredientsCategory
              name={"main"}
              ingredients={currentCategories["main"]}
              setModalItem={setIngredientModalItem}
              setModalIsActive={setIngredientModalIsActive}
            />
          </div>
          <div id="sauce" ref={sauceCategory}>
            <BurgerIngredientsCategory
              name={"sauce"}
              ingredients={currentCategories["sauce"]}
              setModalItem={setIngredientModalItem}
              setModalIsActive={setIngredientModalIsActive}
            />
          </div>
        </>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  name: PropTypes.string,
  ingredients: PropTypes.array.isRequired,
  _id: PropTypes.number,
};

export default BurgerIngredients;
