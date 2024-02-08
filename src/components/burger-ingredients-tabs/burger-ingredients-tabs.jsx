import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-tabs.module.css"
import PropTypes from 'prop-types';


function BurgerIngredientsTabs({tabs}) {
  const [current, setCurrent] = React.useState('bun');
  
  
  const handleTubClick = (type) => {
    setCurrent(type);
    const tab = document.querySelector(`#${type}`);
    if (tab) tab.scrollIntoView({block: "start", behavior: "smooth"})
  }
  
  return (
      <div className={clsx(styles.wrap)} key={tabs}>
        <Tab active={current === 'bun'} onClick={() => {handleTubClick('bun');
        }} value={'bun'}>Булки</Tab>
        <Tab active={current === 'main'} onClick={() => {handleTubClick('main');
        
        }} value={'main'}>Начинка</Tab>
        <Tab active={current === 'sauce'} onClick={() => {handleTubClick('sauce');
        
        }} value={'sauce'}>Соусы</Tab>
      </div>
  )
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
