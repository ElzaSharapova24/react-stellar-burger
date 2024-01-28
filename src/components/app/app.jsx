import React, {useEffect, useState} from "react";
import styles from "./app.module.css";
import clsx from "clsx";
import AppHeader from "../app-header";
import getIngredientsRequest from "../../utils/api";
import BurgerIngredientsCategories from "../burger-ingredients-categories";
import BurgerIngredientsConstructor from "../burger-ingredients-constructor";
import BurgerIngredientsTabs from "../burger-ingredients-tabs"


function App() {
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
      console.log(data)
      if (data.success){
        setCurrentIngredients(data.data)
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
            <BurgerIngredientsCategories groups={currentCategories}/>
          </section>
          <section className={clsx("custom-scroll", styles.scroll)}>
            <BurgerIngredientsConstructor ingredients={currentIngredients}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
