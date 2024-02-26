import clsx from "clsx";
import styles from "../burger-ingredients-category/burger-ingredients-category.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

function BurgerIngredient(props) {
  const { _id, name, price, image, count } = props;
  const location = useLocation();
  const ref = useRef();
  const [{ isDragging }, drag] = useDrag({
    type: "draggableItem",
    item: props,
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });
  drag(ref);

  
  return (
    <article
      className={clsx(styles.inner)}
      key={_id}
      ref={ref}
      style={{
        cursor: "move",
      }}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <Link to={{pathname:`/ingredients/${_id}`}} className={clsx(styles.link)} state={{backgroundLocation: location}}>
        <img
          alt={name}
          src={image}
        />
        <div className={clsx(styles.info)}>
          <div className={clsx(styles.price)}>
            <p
              className={clsx(
                "text text_type_digits-default mr-2",
                styles.text
              )}
            >
              {price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={clsx("text", styles.text)}>{name}</p>
        </div>
      </Link>
    </article>
  );
}

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default BurgerIngredient;
