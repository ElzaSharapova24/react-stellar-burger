import clsx from "clsx";
import styles from "./burger-ingredients-category.module.css";
import React from "react";
import BurgerIngredient from "./burger-ingredient";
import { categoriesNames } from "../../utils/utils";
import {IngredientsDto} from "../../types/slice-types";

interface BurgerIngredientsCategoryProps {
    name: string;
    ingredients?: IngredientsDto[] | null;
}

const BurgerIngredientsCategory = ({name, ingredients,}: BurgerIngredientsCategoryProps) => {
    return (
        <div id={name}>
            <h2 id={name}>{categoriesNames[name]}</h2>
            <div className={clsx(styles.card)}>
                {ingredients &&
                    ingredients.map((ingredient) => (
                        <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
                    ))}
            </div>
        </div>
    );
};

export default BurgerIngredientsCategory;
