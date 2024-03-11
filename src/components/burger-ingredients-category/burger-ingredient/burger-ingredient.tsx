import clsx from "clsx";
import styles from "../burger-ingredients-category.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {IngredientsDto} from "../../../types/slice-types";

interface BurgerIngredientProps {
    ingredient: IngredientsDto,
}

const BurgerIngredient = ({ingredient}: BurgerIngredientProps) => {
    const location = useLocation();
    const {_id, name, price, image, count} = ingredient;
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag({
        type: "draggableItem",
        item: ingredient,
        collect: (monitor) => ({isDragging: !!monitor.isDragging(),}),
    });
    drag(ref);

    return (
        <article
            className={clsx(styles.inner)}
            ref={ref}
        >
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <Link
                to={{ pathname: `/ingredients/${_id}` }}
                className={clsx(styles.link)}
                state={{ backgroundLocation: location }}
            >
                <img alt={name} src={image} />
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.price)}>
                        <p
                            className={clsx(
                                "text text_type_digits-default mr-2",
                                styles.text
                            )}
                        >
                            {price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={clsx("text", styles.text)}>{name}</p>
                </div>
            </Link>
        </article>
    );
};

export default BurgerIngredient;
