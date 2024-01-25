import React from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import clsx from "clsx";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";


function App() {
  return (
    <div className={clsx(styles.app)}>
      <AppHeader/>
      <main>
        <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
          Соберите бургер
        </h1>
        <BurgerIngredients/>
      </main>
    </div>
  );
}

export default App;
