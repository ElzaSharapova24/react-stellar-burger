// import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
// import styles from "./burger-ingredients-constructor.module.css"
// import clsx from "clsx";

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredientsConstructor (props) {
  return props.ingredients.map(key => {
        return    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
   <ConstructorElement
     type={key.type}
     isLocked={true}
     text={key.name}
     price={key.price}
     thumbnail={key.image}
   />
 </div>
  })
}
