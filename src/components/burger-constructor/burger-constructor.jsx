
import clsx from "clsx";
import styles from "./burger-constructor.module.css"
import React from "react";
import {useDrop} from "react-dnd";
import ConstructorItem from "../constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructor ({setModal, onDropHandler, ingredients}) {

  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item) => {
      console.log('asdasd');
      console.log(item);
      console.log('asdasd');
      onDropHandler(item);
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      }
    },
  },);
  
  return (
    <>
      <div className={clsx(styles.wrap,)} ref={drop}
           style={{
             boxShadow: isOver ? '4px -1px 20px 6px rgba(38,19,239,0.51)'
               : '4px -1px 20px 6px rgba(115,106,208,0.51)',
             padding: 10,
             borderRadius: 10,
           }}>
        <ConstructorItem ingredients={ingredients} setModal={setModal}/>
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.price, "mr-10")}>
            <p className={clsx("text text_type_digits-medium")}>2222</p>
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
