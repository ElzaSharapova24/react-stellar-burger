import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import styles from "./burger-ingredients-constructor.module.css"
import Modal from "../modal/modal";
import React from "react";

export default function BurgerIngredientsConstructor (props) {
  const [isModal, setModal] = React.useState(false);
  
  return (
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={props.ingredients.image}
      />
      <div className={clsx(styles.block)}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={props.ingredients.image}
        />
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={props.ingredients.image}/>
      <div className={clsx(styles.inner)}>
        <div className={clsx(styles.price, "mr-10")}>
          <p className={clsx("text text_type_digits-medium")}>2222</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>
          Нажми на меня
        </Button>
      </div>
      <Modal isVisible={isModal}
             onClose={() => setModal(false)}>
        <div>
          <h2 className={clsx("text text_type_digits-large")}>
            1`223344
          </h2>
          <p>
            идентификатор заказа
          </p>
          <div>
            <p>
              Ваш заказ начали готовить
            </p>
            <p>
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </div>
      </Modal>
    </>
    
  )
}
