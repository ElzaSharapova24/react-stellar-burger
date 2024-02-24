import clsx from "clsx";
import styles from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";


function IngredientDetails({ modalItem }) {
  const {image_large, name, calories, proteins, fat, carbohydrates} = modalItem;
  console.log(modalItem)
  return (
    <>
      {modalItem !== null && (
        <div className={clsx(styles.wrapper)}>
          <img
            className={clsx(styles.image)}
            src={image_large}
            alt={name}
          />
          <div className={clsx(styles.inner)}>
            <h3 className={clsx("text text_type_main-medium")}>
              {name}
            </h3>
            <ul className={clsx(styles.list)}>
              <li
                className={clsx(
                  styles.listItem,
                  "text text_type_main-default text_color_inactive"
                )}
              >
                <p>Калории,ккал</p>
                <p>{calories}</p>
              </li>
              <li
                className={clsx(
                  styles.listItem,
                  "text text_type_main-default text_color_inactive"
                )}
              >
                <p>Белки, г</p>
                <p>{proteins}</p>
              </li>
              <li
                className={clsx(
                  styles.listItem,
                  "text text_type_main-default text_color_inactive"
                )}
              >
                <p>Жиры, г</p>
                <p>{fat}</p>
              </li>
              <li
                className={clsx(
                  styles.listItem,
                  "text text_type_main-default text_color_inactive"
                )}
              >
                <p>Углеводы, г</p>
                <p>{carbohydrates}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

IngredientDetails.propTypes = {
  modalItem: PropTypes.object,
};

export default IngredientDetails;
