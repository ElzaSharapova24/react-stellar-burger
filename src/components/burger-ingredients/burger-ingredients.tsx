import clsx from "clsx";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsCategory from "../burger-ingredients-category";
import React from "react";
import BurgerIngredientsTabs from "../burger-ingredients-tabs";
import Loader from "../loader";
import { IngredientsByCategory } from "../../utils/utils";

interface BurgerIngredientsProps {
    isLoading: boolean;
    currentCategories: IngredientsByCategory;
    handleTubClick: (category: string) => void;
    current: string;
    bunCategory: () => void;
    mainCategory: () => void;
    sauceCategory: () => void;
}

const BurgerIngredients = ({
                               isLoading,
                               currentCategories,
                               handleTubClick,
                               current,
                               bunCategory,
                               mainCategory,
                               sauceCategory,
                           }: BurgerIngredientsProps) => {
    return (
        <section className={clsx("custom-scroll", styles.scroll)}>
            {isLoading ? (
                <Loader />
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
                            name="bun"
                            ingredients={currentCategories["bun"]}
                            data-cy='bun-ingredient'
                        />
                    </div>
                    <div id="main" ref={mainCategory}>
                        <BurgerIngredientsCategory
                            name="main"
                            ingredients={currentCategories["main"]}
                        />
                    </div>
                    <div id="sauce" ref={sauceCategory}>
                        <BurgerIngredientsCategory
                            name="sauce"
                            ingredients={currentCategories["sauce"]}
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default BurgerIngredients;
