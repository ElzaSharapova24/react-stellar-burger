import Modal from "../modal/modal";
import clsx from "clsx";
import styles from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";

function IngredientDetails({modalItem, modalIsActive, setModalIsActive}) {
  return (
    // <Modal
    //   isVisible={modalIsActive}
    //   title={"Детали ингредиента"}
    //   onClose={() => setModalIsActive(false)}
    //   className={"text text_type_main-large"}
    // >
      <>
        {modalItem !== null && (
          <div className={clsx(styles.wrapper)}>
            <img
              className={clsx(styles.image)}
              src={modalItem.image_large}
              alt={modalItem.name}
            />
            <div className={clsx(styles.inner)}>
              <h3 className={clsx("text text_type_main-medium")}>
                {modalItem.name}
              </h3>
              <ul className={clsx(styles.list)}>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Калории,ккал</p>
                  <p>{modalItem.calories}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Белки, г</p>
                  <p>{modalItem.proteins}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Жиры, г</p>
                  <p>{modalItem.fat}</p>
                </li>
                <li
                  className={clsx(
                    styles.listItem,
                    "text text_type_main-default text_color_inactive"
                  )}
                >
                  <p>Углеводы, г</p>
                  <p>{modalItem.carbohydrates}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </>
    // </Modal>
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
