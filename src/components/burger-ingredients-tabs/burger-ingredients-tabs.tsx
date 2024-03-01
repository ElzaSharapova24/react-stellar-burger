import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-tabs.module.css";
import PropTypes from "prop-types";
import { categoriesNames } from "../../utils/utils";

interface BurgerIngredientsTabsProps {
  tabs: Record<string, unknown>; // Adjust the type as needed
  current: string;
  handleTubClick: (key: string) => void;
}

const BurgerIngredientsTabs: React.FC<BurgerIngredientsTabsProps> = ({
                                                                       tabs,
                                                                       current,
                                                                       handleTubClick,}) => {
  return (
    <div className={clsx(styles.wrap)}>
      {Object.keys(tabs).map((key) => (
        <Tab
          key={key}
          active={current === key}
          onClick={() => handleTubClick(key)}
          value={key}
        >
          {categoriesNames[key]}
        </Tab>
      ))}
    </div>
  );
};

BurgerIngredientsTabs.propTypes = {
  // tabs: PropTypes.object.isRequired, // Adjust the PropTypes as needed
  current: PropTypes.string.isRequired,
  handleTubClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsTabs;
