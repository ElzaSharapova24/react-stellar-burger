import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export default function BurgerIngredientsTabs() {
  const [current, setCurrent] = React.useState('one')
  return(
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        One
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Two
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Three
      </Tab>
    </div>
  )
}
