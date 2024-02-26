import React, { useEffect, useMemo } from "react";
import OrderDetails from "../order-details";
import { useDispatch } from "react-redux";
import {
  dragBun,
  dragFilling,
  ingredientDelete,
  createOrderResult,
  resetOrder,
} from "../../services/slices/ingredientSlice";
import { useInView } from "react-intersection-observer";
import Modal from "../modal";
import clsx from "clsx";
import styles from "./layout.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import PropTypes from "prop-types";

function Layout({
                  setOrderDetailsModal,
                  orderDetailsModal,
                  fillings,
                  bun,
                  ingredients,
                  isLoading,
                  order,
  
}) {
  const [bunCategory, bunInView] = useInView({ threshold: 0 });
  const [sauceCategory, sauceInView] = useInView({ threshold: 0 });
  const [mainCategory, mainInView] = useInView({ threshold: 0 });
  const [current, setCurrent] = React.useState([0]);
  const dispatch = useDispatch();
  
  const totalPrice = useMemo(() => {
    return (
      fillings.reduce((a, c) => a + c.price, 0) +
      (bun !== null ? bun.price * 2 : 0)
    );
  }, [bun, fillings]);
  
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
  
  return (
    <>
      <div className={clsx(styles.app)}>
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
              mainCategory={mainCategory}
              sauceCategory={sauceCategory}/>
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
              buttonIsDisabled={bun === null}/>
          </div>
        </main>
      </div>
      {orderDetailsModal && (
        <Modal
          onClose={() => {
            setOrderDetailsModal(false);
            dispatch(resetOrder());
          }}
        >
          <OrderDetails order={order} isModal={orderDetailsModal}/>
        </Modal>
      )}
    </>
  );
}


Layout.propTypes = {
  bun: PropTypes.object,
  fillings: PropTypes.array.isRequired,
  setOrderDetailsModal: PropTypes.func.isRequired,
  orderDetailsModal: PropTypes.bool.isRequired,
  ingredients: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  order: PropTypes.object,
};

export default Layout;
