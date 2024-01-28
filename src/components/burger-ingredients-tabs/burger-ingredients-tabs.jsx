import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-tabs.module.css"
import PropTypes from 'prop-types';

function BurgerIngredientsTabs(props) {
  const [current, setCurrent] = React.useState(props.tabs[0])
  
  return Object.keys(props.tabs).map(item => {
    return <div className={clsx(styles.wrap)} key={item}>
      <Tab key={item} active={current === item} onClick={() => {
        setCurrent(item);
        document.querySelector(`#${item}`)?.scrollIntoView({block: "start", behavior: "smooth"});
      }} value={item}>{item}</Tab>
    </div>
  })
}

BurgerIngredientsTabs.propTypes = {
  tabs: PropTypes.object.isRequired
};

export default BurgerIngredientsTabs;
