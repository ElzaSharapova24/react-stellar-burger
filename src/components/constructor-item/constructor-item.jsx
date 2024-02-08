import clsx from "clsx";
import styles from "./constructor-item.module.css";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";


export default function ConstructorItem({setModal, ingredients}) {

  
  return( ingredients.map(item =>
      <><ConstructorElement
        type="top"
        isLocked={true}
        text={item.name}
        thumbnail={item.image}
        price={200}/>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={item.name}
          price={200}
          thumbnail={item.image}
        />
      </>
    )
    
  )
  
}
