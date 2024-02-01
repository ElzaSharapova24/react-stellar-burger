import React, {useEffect, useState} from "react";
import styles from "./app.module.css";
import clsx from "clsx";
import AppHeader from "../app-header";
import getIngredientsRequest from "../../utils/api";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import BurgerIngredientsTabs from "../burger-ingredients-tabs"
import IngredientDetails from "../ingredient-details";
import OrderDetails from "../order-details";


function App() {
  const [modalItem, setModalItem] = React.useState(null);
  const [ingredientDetailsModal, setIngredientDetailsModal] = React.useState(false);
  
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);

  const [currentIngredients, setCurrentIngredients] = useState([]);
  
  const currentCategories = currentIngredients.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
  
  useEffect(() => {
    getIngredientsRequest().then(data => {
    try {
      if (data.success){
        setCurrentIngredients(data.data)
      }
    } catch (error) {
      console.log(error.message())
    }
    })
  }, []);
  
  
  return (
    <div className={clsx(styles.app)}>
      <AppHeader/>
      <main>
        <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
          Соберите бургер
        </h1>
        <div className={clsx(styles.tabs)}>
          <BurgerIngredientsTabs tabs={currentCategories}/>
        </div>
        <div className={clsx(styles.wrapper)}>
          <section className={clsx("custom-scroll", styles.scroll)}>
            <BurgerIngredients ingredients={currentCategories} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
          </section>
          <section className={clsx("custom-scroll", styles.scroll)}>
            <BurgerConstructor setModal={setOrderDetailsModal}/>
          </section>
        </div>
      </main>
      <IngredientDetails modalItem={modalItem} modalIsActive={ingredientDetailsModal} setModalIsActive={setIngredientDetailsModal}/>
      <OrderDetails isModal={orderDetailsModal} setModal={setOrderDetailsModal}/>
    </div>
  );
}

export default App;
