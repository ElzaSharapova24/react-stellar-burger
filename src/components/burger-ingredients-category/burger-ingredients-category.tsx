import clsx from "clsx";
import styles from "./burger-ingredients-category.module.css";
import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import { categoriesNames } from "../../utils/utils";

import clsx from "clsx";
import styles from "./burger-ingredients-category.module.css";
import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import { categoriesNames } from "../../utils/utils";

interface BurgerIngredientsCategoryProps {
    name: string;
    ingredients: Array<{
        _id: string;
        // Добавьте другие свойства по необходимости
    }>;
}

const BurgerIngredientsCategory: React.FC<BurgerIngredientsCategoryProps> = ({
                                                                                 name,
                                                                                 ingredients,
                                                                             }) => {
    return (
        <div id={name}>
            <h2 id={name}>{categoriesNames[name]}</h2>
            <div className={clsx(styles.card)}>
                {ingredients &&
                    ingredients.map((ingredient) => (
                        <BurgerIngredient
                            name={""} price={0} image={""} count={0} {...ingredient}
                            key={ingredient._id}                        />
                    ))}
            </div>
        </div>
    );
};

BurgerIngredientsCategory.propTypes = {
    name: PropTypes.string.isRequired,
    // ingredients: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         _id: PropTypes.string.isRequired,
    //         // Добавьте другие PropTypes по необходимости
    //     })
    // ).isRequired,
};

export default BurgerIngredientsCategory;
