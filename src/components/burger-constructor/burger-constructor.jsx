
import clsx from "clsx";
import styles from "./burger-constructor.module.css"
import React, {useMemo} from "react";
import {useDrop} from "react-dnd";
import ConstructorItem from "../constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor ({setModal,onDrop, bun, fillings, totalPrice}) {
  
  const [{ isOver, itemDrag }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item) => {
      onDrop(item)
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        itemDrag: monitor.getItem()
      }
    }
  });
  
  const isDragBun = itemDrag?.type === 'bun';
  const isDragFilling = itemDrag?.type !== 'bun';
  
  return (
    <>
      <h1 className={clsx(`text text_type_main-large`)}>
        {!isOver && "Добавьте инредиент"}
        {isOver && isDragFilling && "Отпустите инредиент"}
        {isOver && isDragBun && "Добавьте булку"}
      </h1>
      <div className={clsx(styles.wrap,)} ref={drop}
           style={{
             boxShadow: isOver ? '4px -1px 20px 6px rgba(38,19,239,0.51)'
               : null,
             padding: 10,
             borderRadius: 10,
           }}>
        <ConstructorItem bun={bun} fillings={fillings} setModal={setModal}/>
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.price, "mr-10")}>
            <p className={clsx("text text_type_digits-medium")}>{totalPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>
            Нажми на меня
          </Button>
        </div>
      </div>
      
    </>
    
  )
}
