import clsx from "clsx";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsCategory from "../burger-ingredients-category";
import React from "react";
import BurgerIngredientsTabs from "../burger-ingredients-tabs";
import PropTypes from "prop-types";
import Loader from "../loader";

interface BurgerIngredientsProps {
    isLoading: boolean;
    currentCategories: {
        [key: string]: string[];
    };
    handleTubClick: (category: string) => void;
    current: string;
    bunCategory: React.RefObject<HTMLDivElement>;
    mainCategory: React.RefObject<HTMLDivElement>;
    sauceCategory: React.RefObject<HTMLDivElement>;
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
                                                                 isLoading,
                                                                 currentCategories,
                                                                 handleTubClick,
                                                                 current,
                                                                 bunCategory,
                                                                 mainCategory,
                                                                 sauceCategory,
                                                             }) => {
    return (
        <section className={clsx('custom-scroll', styles.scroll)}>
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
                            ingredients={currentCategories['bun']}
                        />
                    </div>
                    <div id="main" ref={mainCategory}>
                        <BurgerIngredientsCategory
                            name="main"
                            ingredients={currentCategories['main']}
                        />
                    </div>
                    <div id="sauce" ref={sauceCategory}>
                        <BurgerIngredientsCategory
                            name="sauce"
                            ingredients={currentCategories['sauce']}
                        />
                    </div>
                </>
            )}
        </section>
    );
};

BurgerIngredients.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // currentCategories: PropTypes.object.isRequired,
    handleTubClick: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
    // bunCategory: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    //     .isRequired,
    // mainCategory: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    //     .isRequired,
    // sauceCategory: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    //     .isRequired,
};

export default BurgerIngredients;
