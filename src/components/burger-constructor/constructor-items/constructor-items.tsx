import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import styles from "./constructor-items.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import {IngredientsDto} from "../../../types/slice-types";

interface ConstructorItemsProps {
    fillings: IngredientsDto[];
    bun: IngredientsDto | null;
    handleDeleteIngredient: () => void;
}

const ConstructorItems = ({
                              bun,
                              fillings,
                              handleDeleteIngredient,
                          }: ConstructorItemsProps) => {

    return (
        <React.Fragment>
            {bun && (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image}
                    price={bun.price}
                />
            )}

            <div className={clsx("custom-scroll", styles.scroll)}>
                {fillings.map((item: IngredientsDto, index: number) => (
                    <BurgerConstructorItem
                        key={item.id}
                        item={item}
                        index={index}
                        handleDeleteIngredient={handleDeleteIngredient}
                    />
                ))}
            </div>
            {bun && (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image}
                    price={bun.price}
                />
            )}
        </React.Fragment>
    );
}

export default ConstructorItems;
