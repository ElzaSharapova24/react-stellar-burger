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
import {getIngredientsFetch, dragIngredient} from "../../services/getIngredient/ingredientSlice";

function App() {
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const {ingredients, draggedIngredients, isLoading, error} = useSelector(getIngredients);
  const dispatch = useDispatch();
  
  const [modalItem, setModalItem] = React.useState(null);
  const [ingredientDetailsModal, setIngredientDetailsModal] = React.useState(false);
  
  const handleDrop = (item) => {
    if (item.type === 'bun') {
      console.log('qweqwe')
      dispatch(dragIngredient(item._id));
      
    } else {
      console.log('hff')
      dispatch(dragIngredient(item._id));
    }
    

  };
  
  const currentCategories = ingredients.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
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
          <div className={clsx(styles.wrapper)}>
            <section className={clsx("custom-scroll", styles.scroll) }>
              {isLoading ? 'loading...' : <BurgerIngredients ingredients={currentCategories} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>}
            </section>
            <section>
              <BurgerConstructor ingredients={draggedIngredients} setModal={setOrderDetailsModal} onDropHandler={handleDrop}/>
            </section>
          </div>
      </main>
      <IngredientDetails modalItem={modalItem} modalIsActive={ingredientDetailsModal} setModalIsActive={setIngredientDetailsModal}/>
      <OrderDetails isModal={orderDetailsModal} setModal={setOrderDetailsModal}/>
    </div>
  );
}

export default App;
