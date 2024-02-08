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
import {useInView} from "react-intersection-observer";

function App() {
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const {ingredients, draggedIngredients, isLoading, error} = useSelector(getIngredients);
  const dispatch = useDispatch();
  
  const [modalItem, setModalItem] = React.useState(null);
  const [ingredientDetailsModal, setIngredientDetailsModal] = React.useState(false);
  
  const [bun, bunInView] = useInView({ threshold: 0 });
  const [sauce, sauceInView] = useInView({ threshold: 0 });
  const [main, mainInView] = useInView({ threshold: 0 });
  
  const [current, setCurrent] = React.useState([0]);
  
  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, []);
  
  
  
  const handleTubClick = (type) => {
    setCurrent(type);
    const tab = document.querySelector(`#${type}`);
    if (tab) tab.scrollIntoView({block: "start", behavior: "smooth"})
  }
  
  useEffect(() => {
    bunInView ? setCurrent("bun") : (sauceInView ? setCurrent("sauce") : setCurrent("main"))
  }, [bunInView, sauceInView, mainInView]);
  
  
  const handleDrop = (item) => {
    if (item.type === 'bun') {
      dispatch(dragIngredient(item._id));
      
    } else {
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
  console.log(currentCategories)
  
  return (
    <div className={clsx(styles.app)}>
      <AppHeader/>
      <main>
        <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
          Соберите бургер
        </h1>
        <div className={clsx(styles.tabs)}>
          <BurgerIngredientsTabs tabs={currentCategories} current={current} handleTubClick={handleTubClick}/>
        </div>
          <div className={clsx(styles.wrapper)}>
            <section className={clsx("custom-scroll", styles.scroll) }>
              {
                isLoading ? 'loading...'
                  : <>
                    <div id='bun' ref={bun}>
                      <BurgerIngredients name={'bun'} ingredients={currentCategories['bun']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                    <div id='main' ref={main}>
                      <BurgerIngredients name={'main'} ingredients={currentCategories['main']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                    <div id='sauce' ref={sauce}>
                      <BurgerIngredients name={'sauce'} ingredients={currentCategories['sauce']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                  </>
              }
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
