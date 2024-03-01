import clsx from "clsx";
import styles from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getIngredients} from "../../services/selectors";

function IngredientDetails(
) {
  let { id } = useParams();
  const { ingredients } = useSelector(getIngredients);
  const modalItem = ingredients.find(e => e._id === id);
  if (!modalItem)
    return <></>;
  const {image_large, name, calories, proteins, fat, carbohydrates} = modalItem;
  return (
    <>
      {(
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
