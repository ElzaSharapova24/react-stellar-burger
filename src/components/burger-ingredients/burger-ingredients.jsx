import clsx from "clsx";
import styles from "./burger-ingredients.module.css"
import React from "react";
import IngredientDetails from "../ingredient-details"
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";

function BurgerIngredients (props) {
  const [modalItem, setModalItem] = React.useState(null);
  const [modalIsActive, setModalIsActive] = React.useState(false);
  
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    return <div key={key}>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)} key={key}>
        {value.map((item) =>
          <BurgerIngredient {...item} onClick={() => {
            setModalItem(item);
            setModalIsActive(true);
          }} key={item._id}/>
        )}
      </div>
      <IngredientDetails modalItem={modalItem} modalIsActive={modalIsActive} setModalIsActive={setModalIsActive}/>
    </div>
  })
}

BurgerIngredients.propTypes = {
  groups: PropTypes.object.isRequired
};

export default BurgerIngredients;
