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
        <BurgerIngredients/>
      </main>
    </div>
  );
}

export default App;
