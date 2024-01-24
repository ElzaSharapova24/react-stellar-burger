import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export default function BurgerIngredientsTabs(props) {
  const [current, setCurrent] = React.useState('buns')
  
  const tabs = props.tabs.map(item =>
    <Tab key={item} active={current === 'buns'} onClick={setCurrent} value={item}>{item}</Tab>
  );
  return(
    <div style={{ display: 'flex' }}>
      {tabs}
    </div>
  )
}
