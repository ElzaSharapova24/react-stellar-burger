import clsx from "clsx";
import styles from "./burger-constructor.module.css";
import React from "react";
import { useDrop } from "react-dnd";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { IngredientsDto } from "../../types/slice-types";
import ConstructorItems from "./constructor-items/constructor-items";

interface BurgerConstructorProps {
    onClick: () => void;
    onDrop: (item: any) => void;
    bun: IngredientsDto | null;
    fillings: IngredientsDto[];
    totalPrice: number;
    handleDeleteIngredient: any;
    buttonIsDisabled: boolean;
}

const BurgerConstructor = ({
                               onClick,
                               onDrop,
                               bun,
                               fillings,
                               totalPrice,
                               handleDeleteIngredient,
                               buttonIsDisabled,
                           }: BurgerConstructorProps) => {
    const [{ isOver, itemDrag }, drop] = useDrop({
        accept: "draggableItem",
        drop: (item) => {
            onDrop(item);
        },
        collect: (monitor) => {
            return {
                isOver: !!monitor.isOver(),
                itemDrag: monitor.getItem(),
            };
        },
    });

    const isDragBun = itemDrag?.type === "bun";
    const isDragFilling = itemDrag?.type !== "bun";

    return (
        <>
            <section>
                <h1 className={clsx(`text text_type_main-large`)}>
                    {!isOver && "Добавьте инредиент"}
                    {isOver && isDragFilling && "Отпустите инредиент"}
                    {isOver && isDragBun && "Добавьте булку"}
                </h1>
                <div
                    className={clsx(styles.wrap)}
                    ref={drop}
                    data-cy='drop-container'
                    style={{
                        boxShadow: isOver
                            ? "4px -1px 20px 6px rgba(38,19,239,0.51)"
                            : undefined,
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <ConstructorItems
                        bun={bun}
                        fillings={fillings}
                        handleDeleteIngredient={handleDeleteIngredient}
                    />
                    <div className={clsx(styles.inner)}>
                        <div className={clsx(styles.price, "mr-10")}>
                            <p className={clsx("text text_type_digits-medium")}>
                                {totalPrice}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Link to="/login">
                            <Button
                                htmlType="button"
                                type="primary"
                                size="large"
                                onClick={onClick}
                                disabled={buttonIsDisabled}
                            >
                                Нажми на меня
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BurgerConstructor;
