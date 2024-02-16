import clsx from "clsx";
import styles from "./burger-constructor.module.css";
import React from "react";
import { useDrop } from "react-dnd";
import ConstructorItems from "../constructor-item";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerConstructor({
  onClick,
  onDrop,
  bun,
  fillings,
  totalPrice,
  handleDeleteIngredient,
}) {
  
  
  const [{ isOver, itemDrag }, drop] = useDrop({
    accept: "draggableItem",
    drop: (item) => {
      onDrop(item);
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        itemDrag: monitor.getItem(),
      };
    },
  });

  const isDragBun = itemDrag?.type === "bun";
  const isDragFilling = itemDrag?.type !== "bun";

  return (
    <>
      <h1 className={clsx(`text text_type_main-large`)}>
        {!isOver && "Добавьте инредиент"}
        {isOver && isDragFilling && "Отпустите инредиент"}
        {isOver && isDragBun && "Добавьте булку"}
      </h1>
      <div
        className={clsx(styles.wrap)}
        ref={drop}
        style={{
          boxShadow: isOver ? "4px -1px 20px 6px rgba(38,19,239,0.51)" : null,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <ConstructorItems
          bun={bun}
          fillings={fillings}
          handleDeleteIngredient={handleDeleteIngredient}
        />
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.price, "mr-10")}>
            <p className={clsx("text text_type_digits-medium")}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onClick}
          >
            Нажми на меня
          </Button>
        </div>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  bun: PropTypes.object,
  fillings: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
};

export default BurgerConstructor;
