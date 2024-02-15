import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./constructor-items.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import PropTypes from "prop-types";

function ConstructorItems({ bun, fillings, handleDeleteIngredient }) {
  return (
    <React.Fragment>
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          thumbnail={bun.image}
          price={bun.price}
        />
      )}

      <div className={clsx("custom-scroll", styles.scroll)}>
        {fillings.map((item, index) => (
          <BurgerConstructorItem
            key={item.id}
            item={item}
            index={index}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        ))}
      </div>
      {bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          thumbnail={bun.image}
          price={bun.price}
        />
      )}
    </React.Fragment>
  );
}

ConstructorItems.propTypes = {
  bun: PropTypes.object,
  fillings: PropTypes.array.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
  index: PropTypes.number,
  handleDeleteIngredient: PropTypes.func,
};

export default ConstructorItems;
