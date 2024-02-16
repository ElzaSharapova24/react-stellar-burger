import Modal from "../modal/modal";
import clsx from "clsx";
import styles from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  return (
    <Modal
      isVisible={props.modalIsActive}
      title={"Детали ингредиента"}
      onClose={() => props.setModalIsActive(false)}
      className={"text text_type_main-large"}
    >
      <>
        {props.modalItem !== null && (
          <div className={clsx(styles.wrapper)}>
            <img
              className={clsx(styles.image)}
              src={props.modalItem.image_large}
              alt={props.modalItem.name}
            />
            <div className={clsx(styles.inner)}>
              <h3 className={clsx("text text_type_main-medium")}>
                {props.modalItem.name}
              </h3>
              <ul className={clsx(styles.list)}>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Калории,ккал</p>
                  <p>{props.modalItem.calories}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Белки, г</p>
                  <p>{props.modalItem.proteins}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Жиры, г</p>
                  <p>{props.modalItem.fat}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Углеводы, г</p>
                  <p>{props.modalItem.carbohydrates}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
}


IngredientDetails.propTypes = {
  modalIsActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  name: PropTypes.string,
  image_large: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};




export default IngredientDetails;
