import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import styles from "./burger-constructor.module.css"
import React from "react";

export default function BurgerConstructor ({setModal}) {
  
  return (
    <>
      <div className={clsx(styles.wrap,)}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="#"
        />
        <div className={clsx("custom-scroll", styles.scroll)}>
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail="#"
            />
          </div>
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail="#"
            />
          </div>
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail="#"
            />
          </div>
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail="#"/>
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.price, "mr-10")}>
            <p className={clsx("text text_type_digits-medium")}>2222</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>
            Нажми на меня
          </Button>
        </div>
      </div>
      
    </>
    
  )
}
