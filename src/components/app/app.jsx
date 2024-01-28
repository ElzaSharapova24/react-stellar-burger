import React, {useEffect, useState} from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import clsx from "clsx";
import AppHeader from "../app-header/app-header";
import getIngredientsRequest from "../../utils/api";
import BurgerIngredientsCategories from "../burger-ingredients-categories/burger-ingredients-categories";
import BurgerIngredientsConstructor from "../burger-ingredients-constructor/burger-ingredients-constructor";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";


function App() {
  // const [currentIngredients, setCurrentIngredients] = useState([]);
  
  // const categories = props.ingredients.map(item => item.type);
  // const filteredCategories = [...new Set(categories)];
  
  const groups = data.reduce((result, current) => {
    if (!result[current.type]) {
      result[current.type] = [];
    }
    result[current.type].push(current);
    return result;
  }, {});
  
  console.log(data)
  
  
  // useEffect(() => {
  //   getIngredientsRequest().then(data => {
  //     console.log(getIngredientsRequest())
  //     setCurrentIngredients(data)
  //   })
  // });
  
  // console.log(currentIngredients);
  return (
    <div className={clsx(styles.app)}>
      <AppHeader/>
      <main>
        <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
          Соберите бургер
        </h1>
        <div className={clsx(styles.tabs)}>
          <BurgerIngredientsTabs tabs={groups}/>
        </div>
        <div className={clsx(styles.wrapper)}>
          <section className={clsx("custom-scroll", styles.scroll)}>
            <BurgerIngredientsCategories groups={groups}/>
          </section>
          <section className={clsx("custom-scroll", styles.scroll)}>
            <BurgerIngredientsConstructor ingredients={data}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
