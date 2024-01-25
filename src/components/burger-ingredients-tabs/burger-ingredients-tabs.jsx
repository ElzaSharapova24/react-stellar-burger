import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export default function BurgerIngredientsTabs(props) {
  const [current, setCurrent] = React.useState(props.tabs[0])
  
  const tabs = props.tabs.map(item =>
    <Tab key={item} active={current === item} onClick={() => {
      setCurrent(item);
      document.querySelector(`#${item}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
    }} value={item}>{item}</Tab>
  );
  return(
    <div style={{ display: 'flex' }}>
      {tabs}
    </div>
  )
}
