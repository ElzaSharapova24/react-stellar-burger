import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-categories.module.css"
import Modal from "../modal/modal";
import React from "react";

export default function BurgerIngredientsCategories (props) {
  // const [modalIngridient, setModalIngridient] = useState(null);
  // const closeModalIngredient = () => {
  //   setModalIngridient(null)
  // }
  
  const [modalItem, setModalItem] = React.useState(null);
  const [modalIsActive, setModalIsActive] = React.useState(false);
  
  
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    return <div>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)}>
        {value.map((item) =>
            <article>
              <img alt={item.name} src={item.image} onClick={() => {
                setModalItem(item);
                setModalIsActive(true);
              }}/>
              <div className={clsx(styles.info)}>
                <div className={clsx(styles.price)}>
                  <p className="text text_type_digits-default mr-2">{item.price}</p>
                  <CurrencyIcon type="primary"/>
               </div>
                <p className={clsx("text")}>{item.name}</p>
              </div>
            </article>
        )}

      </div>
      <Modal
        isVisible={modalIsActive}
        title={"fkjfjdfjf"}
        onClose={() => setModalIsActive(false)}
      >
        <>
          {
            (modalItem !== null) && <div className={clsx(styles.content)}>
              <h2 className={clsx("text text_type_main-large", styles.heading)}>Детали ингредиента</h2>
              <img className={clsx(styles.image)} src={modalItem.image_large} alt={modalItem.name}/>
              <h3 className={clsx("text text_type_main-medium", styles.heading)}>{modalItem.name}</h3>
              <ul className={clsx(styles.list)}>
                <li className={clsx("text text_type_main-default text_color_inactive")}>{modalItem.calories}</li>
                <li className={clsx("text text_type_main-default text_color_inactive")}>{modalItem.proteins}</li>
                <li className={clsx("text text_type_main-default text_color_inactive")}>{modalItem.fat}</li>
                <li className={clsx("text text_type_main-default text_color_inactive")}>{modalItem.carbohydrates}</li>
              </ul>
            </div>
          }
        </>
      </Modal>
    </div>
  })
}
