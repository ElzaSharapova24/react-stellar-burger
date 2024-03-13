import styles from "./order-ingredient-details.module.css"
import clsx from "clsx";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientShortDto, TAllOrder} from "../../../../../types/api-types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router";
import React from "react";
interface OrderIngredientDetailsProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
}

const OrderIngredientDetails = ({imagesByIds, orders }: OrderIngredientDetailsProps) => {
    let {id} = useParams();
    const order = orders.find(e => e._id === id);
    if (!order) return <></>;
    const ingredients = order.ingredients.map(id => imagesByIds.get(id));
    const orderStatus = () => {return order.status === "done" ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : null};
    const resultIngredients = ingredients
        .filter(e => e != undefined)
        .reduce((acc, current ) => {
            let el = acc.find(e => e._id === current!._id);
            if (el === undefined){
                acc.push({
                    image: current!.image,
                    price: current!.price,
                    name: current!.name,
                    count: 1,
                    _id: current!._id,
                })
            } else {
                el.count++;
            }
            return acc;
        }, [] as IngredientShortDto[]);
    const totalPrice = resultIngredients.reduce((a,c) => {
        return a + (c.price * c.count);
    },0)
    return (
       <>
           {
               <article key={order._id} className={clsx(styles.wrapper)}>
                   <p className={clsx("text text_type_digits-default mb-5", styles.number)}>{`#${order.number}`}</p>
                   <h1 className={clsx("text text_type_main-medium mb-1")}>{order.name}</h1>
                   <span className={clsx(styles.status, "text text_type_main-default mb-10")}>{orderStatus()}</span>
                   <div className={clsx(styles.wrap)}>
                       <h2 className={clsx("text text_type_main-medium mb-5")}>
                           Состав:
                       </h2>
                       <ul className={clsx(styles.list, "custom-scroll mb-7")}>
                           <li className={clsx(styles.item)}>
                               {
                                   resultIngredients.map((ingredient, index) => {
                                           const {image, name, price, count} = ingredient!;
                                           return <div className={clsx(styles.block)} key={index}>
                                               <div className={clsx(styles.inner)}>
                                                   <img src={image} alt={name} className={clsx(styles.img)}/>
                                                   <h3 className={clsx("text text_type_main-small")}>{name}</h3>
                                               </div>
                                               <div className={clsx(styles.price)}>
                                                   <p className={clsx("text text_type_main-default")}>{count} x {price}</p>
                                                   <CurrencyIcon type="primary"/>
                                               </div>
                                           </div>
                                       })
                               }
                           </li>
                       </ul>
                       <div className={clsx(styles.info)}>
                           <FormattedDate
                               className={clsx("text text_type_main-small text_color_inactive")}
                               date={new Date(order.createdAt)}/>
                           <div className={clsx(styles.price)}>
                               <p className={clsx("text text_type_digits-default")}>{totalPrice}</p>
                               <CurrencyIcon type="primary" />
                           </div>
                       </div>
                   </div>
               </article>
           }
       </>
    )
}

export default OrderIngredientDetails;
