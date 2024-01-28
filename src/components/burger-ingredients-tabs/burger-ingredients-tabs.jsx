import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-tabs.module.css"

export default function BurgerIngredientsTabs(props) {
  const [current, setCurrent] = React.useState(props.tabs[0])
  
  return Object.keys(props.tabs).map(item => {
    return <div className={clsx(styles.wrap)}>
      <Tab key={item} active={current === item} onClick={() => {
        setCurrent(item);
        document.querySelector(`#${item}`)?.scrollIntoView({block: "start", behavior: "smooth"});
      }} value={item}>{item}</Tab>
    </div>
  })
}
