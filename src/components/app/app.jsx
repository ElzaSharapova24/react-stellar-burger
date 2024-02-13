import React, {useEffect, useMemo} from "react";
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
import {
  getIngredientsFetch,
  dragBun,
  dragFilling,
  ingredientDelete
} from "../../services/getIngredient/ingredientSlice";
import {useInView} from "react-intersection-observer";


function App() {
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const {ingredients, bun, fillings, isLoading, error} = useSelector(getIngredients);
  const dispatch = useDispatch();
  
  const totalPrice = useMemo(() => {
    return fillings.reduce((a,c) => a + c.price, 0) + (bun !== null ? bun.price * 2 : 0);
  }, [bun, fillings]);
  
  const [modalItem, setModalItem] = React.useState(null);
  const [ingredientDetailsModal, setIngredientDetailsModal] = React.useState(false);
  
  const [bunCategory, bunInView] = useInView({ threshold: 0 });
  const [sauceCategory, sauceInView] = useInView({ threshold: 0 });
  const [mainCategory, mainInView] = useInView({ threshold: 0 });
  
  const [current, setCurrent] = React.useState([0]);
  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);
  
  const handleTubClick = (type) => {
    setCurrent(type);
    const tab = document.querySelector(`#${type}`);
    if (tab) tab.scrollIntoView({block: "start", behavior: "smooth"})
  }
  
  const handleDeleteIngredient = (item) => dispatch(ingredientDelete(item));
  
  useEffect(() => {
    bunInView ? setCurrent("bunCategory") : (sauceInView ? setCurrent("sauceCategory") : setCurrent("mainCategory"))
  }, [bunInView, sauceInView, mainInView]);
  
  
  const handleDrop = (item) => {
    if (item.type === 'bun') {
      dispatch(dragBun(item));
    } else {
      dispatch(dragFilling(item));
    }
  };
  
  
  const currentCategories = ingredients.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
  
  if(error) {
    return <h1>Error:{'Ошибка на стороне сервера'}</h1>
  } else {
    return (
      <div className={clsx(styles.app)}>
        <AppHeader/>
        <mainCategory>
          <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
            Соберите бургер
          </h1>
          <div className={clsx(styles.tabs)}>
            <BurgerIngredientsTabs tabs={currentCategories} current={current} handleTubClick={handleTubClick}/>
          </div>
          <div className={clsx(styles.wrapper)}>
            <section className={clsx("custom-scroll", styles.scroll) }>
              {
                isLoading
                  ? 'loading...'
                  : <>
                    <div id='bun' ref={bunCategory}>
                      <BurgerIngredients name={'bun'} ingredients={currentCategories['bun']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                    <div id='main' ref={mainCategory}>
                      <BurgerIngredients name={'main'} ingredients={currentCategories['main']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                    <div id='sauce' ref={sauceCategory}>
                      <BurgerIngredients name={'sauce'} ingredients={currentCategories['sauce']} setModalItem={setModalItem} setModalIsActive={setIngredientDetailsModal}/>
                    </div>
                  </>
              }
            </section>
            <section>
              <BurgerConstructor fillings={fillings} bun={bun} totalPrice={totalPrice} setModal={setOrderDetailsModal} handleDeleteIngredient={handleDeleteIngredient} onDrop={handleDrop}/>
            </section>
          </div>
        </mainCategory>
        <IngredientDetails modalItem={modalItem} modalIsActive={ingredientDetailsModal} setModalIsActive={setIngredientDetailsModal}/>
        <OrderDetails isModal={orderDetailsModal} setModal={setOrderDetailsModal}/>
      </div>
    );
  }
}

export default App;
