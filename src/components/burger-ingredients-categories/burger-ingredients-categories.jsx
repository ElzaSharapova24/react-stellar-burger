import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";
import styles from "./burger-ingredients-categories.module.css"
import Modal from "../modal/modal";
import React from "react";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";

export default function BurgerIngredientsCategories (props) {
  // const [modalIngridient, setModalIngridient] = useState(null);
  // const closeModalIngredient = () => {
  //   setModalIngridient(null)
  // }
  
  const [modalItem, setModalItem] = React.useState(null);
  const [modalIsActive, setModalIsActive] = React.useState(false);
  
  console.log(props.groups)
  return Object.keys(props.groups).map(key => {
    const value = props.groups[key];
    console.log(value);
    return <div>
      <h2 id={key}>
        {key}
      </h2>
      <div className={clsx(styles.card)}>
        {value.map((item) =>
            <article className={clsx(styles.inner)}>
              <Counter count={1}/>
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
            (modalItem !== null) && <div className={clsx(styles.content, "p-10")}>
              <h2 className={clsx("text text_type_main-large", styles.heading)}>Детали ингредиента</h2>
              <img className={clsx(styles.image)} src={modalItem.image_large} alt={modalItem.name}/>
              <div className={clsx(styles.wrap)}>
                <h3 className={clsx("text text_type_main-medium", styles.heading)}>{modalItem.name}</h3>
                <ul className={clsx(styles.list)}>
                  <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
                    <p>Калории,ккал</p>
                    <p>{modalItem.calories}</p>
                  </li>
                  <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
                    <p>Белки, г</p>
                    <p>{modalItem.proteins}</p>
                  </li>
                  <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
                    <p>Жиры, г</p>
                    <p>{modalItem.fat}</p>
                  </li>
                  <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
                    <p>Углеводы, г</p>
                    <p>{modalItem.carbohydrates}</p>
                  </li>
                </ul>
              </div>
            </div>
          }
        </>
      </Modal>
    </div>
  })
}
