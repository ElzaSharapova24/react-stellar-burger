import clsx from "clsx";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

function BurgerIngredient(props) {
  return (
    <article className={clsx(styles.inner)} key={props._id}>
      <a href="#" className={clsx(styles.link)}>
        <img alt={props.name} src={props.image} onClick={() => {
          props.onClick();
        }}/>
        <div className={clsx(styles.info)}>
          <div className={clsx(styles.price)}>
            <p className={clsx("text text_type_digits-default mr-2", styles.text)}>{props.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={clsx("text", styles.text)}>{props.name}</p>
        </div>
      </a>
    </article>
  )
}

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredient;

