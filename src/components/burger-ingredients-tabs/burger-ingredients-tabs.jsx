import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-tabs.module.css"
import PropTypes from 'prop-types';
import categoriesNames from "../../utils/utils";


function BurgerIngredientsTabs({tabs, current, handleTubClick}) {
  
  return <div className={clsx(styles.wrap)}>
    {
      Object.keys(tabs).map(key => {
        return <Tab active={current === key} onClick={() => handleTubClick(key)} key={key} value={key}>
          {categoriesNames[key]}
        </Tab>
      })}
  </div>
}

BurgerIngredientsTabs.propTypes = {
  tabs: PropTypes.object.isRequired
};

export default BurgerIngredientsTabs;
// Object.keys(props.tabs).map(item => {
//   return <div className={clsx(styles.wrap)} key={item}>
//     <Tab key={item} active={current === item} onClick={() => {
//       setCurrent(item);
//       document.querySelector(`#${item}`)?.scrollIntoView({block: "start", behavior: "smooth"});
//     }} value={item}>{item}</Tab>
//   </div>
// })
