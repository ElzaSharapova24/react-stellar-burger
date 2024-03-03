import React, { useEffect, useMemo } from "react";
import OrderDetails from "../order-details";
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
import { useDispatch } from "../../services/hooks";
import { IngredientsDto } from "../../types/slice-types";
import { CreateOrderResponse } from "../../types/api-types";
import { IngredientsByCategory } from "../../utils/utils";

interface LayoutProps {
  setOrderDetailsModal: (a: boolean) => void;
  orderDetailsModal: boolean;
  bun: IngredientsDto | null;
  fillings: IngredientsDto[];
  ingredients: IngredientsDto[];
  order: CreateOrderResponse | null;
  isLoading: boolean;
}

const Layout = ({
  setOrderDetailsModal,
  orderDetailsModal,
  fillings,
  bun,
  ingredients,
  isLoading,
  order,
}: LayoutProps) => {
  const [bunCategory, bunInView] = useInView({ threshold: 0 });
  const [sauceCategory, sauceInView] = useInView({ threshold: 0 });
  const [mainCategory, mainInView] = useInView({ threshold: 0 });
  const [current, setCurrent] = React.useState<string>("bun");
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    return (
      fillings.reduce((a: number, c: IngredientsDto) => a + c.price, 0) +
      (bun !== null ? bun.price * 2 : 0)
    );
  }, [bun, fillings]);

  const handleTubClick = (type: string) => {
    setCurrent(type);
    const tab = document.querySelector(`#${type}`);
    if (tab) tab.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleDeleteIngredient = (item: any) =>
    dispatch(ingredientDelete(item));

  useEffect(() => {
    if (bunInView) {
      setCurrent("bun");
    } else if (sauceInView) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  }, [bunInView, sauceInView, mainInView]);

  const handleDrop = (item: IngredientsDto) => {
    console.log(item);
    if (item.type === "bun") {
      dispatch(dragBun(item));
    } else {
      dispatch(dragFilling(item));
    }
  };

  const currentCategories = ingredients.reduce(
    (result: IngredientsByCategory, current: IngredientsDto) => {
      if (!result[current.type]) {
        result[current.type] = [];
      }
      result[current.type].push(current);
      return result;
    },
    {} as IngredientsByCategory
  );

  return (
    <>
      <div className={clsx(styles.app)}>
        <main>
          <h1 className={clsx("pt-10 pb-5 text text_type_main-large")}>
            Соберите бургер
          </h1>
          <div className={clsx(styles.wrapper)}>
            <BurgerIngredients
              isLoading={isLoading}
              currentCategories={currentCategories}
              handleTubClick={handleTubClick}
              current={current}
              bunCategory={bunCategory}
              mainCategory={mainCategory}
              sauceCategory={sauceCategory}
            />
            <BurgerConstructor
              fillings={fillings}
              bun={bun}
              totalPrice={totalPrice}
              onClick={() => {
                dispatch(
                  createOrderResult(fillings.map((e) => e._id).concat(bun!._id))
                );
                setOrderDetailsModal(true);
              }}
              handleDeleteIngredient={handleDeleteIngredient}
              onDrop={handleDrop}
              buttonIsDisabled={bun === null}
            />
          </div>
        </main>
      </div>
      {orderDetailsModal && (
        <Modal
          title={""}
          onClose={() => {
            setOrderDetailsModal(false);
            dispatch(resetOrder());
          }}
        >
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};

export default Layout;
