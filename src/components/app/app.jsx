import React, {useEffect, useState} from "react";
import styles from "./app.module.css";
import clsx from "clsx";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import BurgerIngredientsTabs from "../burger-ingredients-tabs"
import IngredientDetails from "../ingredient-details";
import OrderDetails from "../order-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/selectors";
import {getIngredientsFetch} from "../../services/getIngredient/ingredientSlice";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
  const {ingredients, isLoading, error} = useSelector(getIngredients);
  const dispatch = useDispatch();
  
  const [modalItem, setModalItem] = React.useState(null);
  const [ingredientDetailsModal, setIngredientDetailsModal] = React.useState(false);
  
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  
  const currentCategories = ingredients.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
  console.log(currentCategories)
  
  useEffect(() => {
    dispatch(getIngredientsFetch());
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
        <DndProvider backend={HTML5Backend}>
          <div className={clsx(styles.wrapper)}>
            <section className={clsx("custom-scroll", styles.scroll)}>
              {isLoading ? 'loading...' : <BurgerIngredients ingredients={currentCategories} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>}
            </section>
            <section>
              <BurgerConstructor setModal={setOrderDetailsModal}/>
            </section>
          </div>
        </DndProvider>
      </main>
      <IngredientDetails modalItem={modalItem} modalIsActive={ingredientDetailsModal} setModalIsActive={setIngredientDetailsModal}/>
      <OrderDetails isModal={orderDetailsModal} setModal={setOrderDetailsModal}/>
    </div>
  );
}

export default App;
