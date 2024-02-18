import React, { useEffect, useMemo } from "react";
import styles from "./app.module.css";
import clsx from "clsx";
import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import IngredientDetails from "../ingredient-details";
import OrderDetails from "../order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/selectors";
import {
  getIngredientsFetch,
  dragBun,
  dragFilling,
  ingredientDelete,
  createOrderResult,
  resetOrder,
} from "../../services/slices/ingredientSlice";
import { useInView } from "react-intersection-observer";
import Modal from "../modal";
import BurgerIngredients from "../burger-ingredients";

function App() {
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [ingredientModalItem, setIngredientModalItem] = React.useState(null);
  const [ingredientModalIsActive, setIngredientModalIsActive] =
    React.useState(false);
  const [bunCategory, bunInView] = useInView({ threshold: 0 });
  const [sauceCategory, sauceInView] = useInView({ threshold: 0 });
  const [mainCategory, mainInView] = useInView({ threshold: 0 });

  const [current, setCurrent] = React.useState([0]);
  
  const { ingredients, bun, fillings, isLoading, error, order } =
    useSelector(getIngredients);
  const dispatch = useDispatch();
  
  const totalPrice = useMemo(() => {
    return (
      fillings.reduce((a, c) => a + c.price, 0) +
      (bun !== null ? bun.price * 2 : 0)
    );
  }, [bun, fillings]);

  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);

  const handleTubClick = (type) => {
    setCurrent(type);
    const tab = document.querySelector(`#${type}`);
    if (tab) tab.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleDeleteIngredient = (item) => dispatch(ingredientDelete(item));

  useEffect(() => {
    if (bunInView) {
      setCurrent("bun");
    } else if (sauceInView) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  }, [bunInView, sauceInView, mainInView]);

  const handleDrop = (item) => {
    if (item.type === "bun") {
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

  if (error) {
    return <h1>Error:{"Ошибка на стороне сервера"}</h1>;
  } else {
    return (
      <div className={clsx(styles.app)}>
        <AppHeader />
        <main>
          <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
            Соберите бургер
          </h1>
          <div className={clsx(styles.wrapper)}>
            <BurgerIngredients
              ingredients={ingredients}
              isLoading={isLoading}
              currentCategories={currentCategories}
              handleTubClick={handleTubClick}
              current={current}
              bunCategory={bunCategory}
              setIngredientModalItem={setIngredientModalItem}
              setIngredientModalIsActive={setIngredientModalIsActive}
              mainCategory={mainCategory}
              sauceCategory={sauceCategory}
            />
            <BurgerConstructor
              fillings={fillings}
              bun={bun}
              totalPrice={totalPrice}
              onClick={() => {
                dispatch(
                  createOrderResult({
                    ingredients: fillings.map((e) => e._id).concat(bun._id),
                  })
                );
                setOrderDetailsModal(true);
              }}
              handleDeleteIngredient={handleDeleteIngredient}
              onDrop={handleDrop}
              buttonIsDisabled={bun === null}
            />
          </div>
        </main>
        {ingredientModalIsActive && (
          <Modal
            title={"Детали ингредиента"}
            onClose={() => setIngredientModalIsActive(false)}
            className={"text text_type_main-large"}
          >
            <IngredientDetails modalItem={ingredientModalItem} modalIsActive />
          </Modal>
        )}
        {orderDetailsModal && (
          <Modal
            onClose={() => {
              setOrderDetailsModal(false);
              dispatch(resetOrder());
            }}
          >
            <OrderDetails order={order} isModal={orderDetailsModal} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
