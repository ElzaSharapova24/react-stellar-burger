import styles from "./order-ingredient-details.module.css"
import clsx from "clsx";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientShortDto, TAllOrder} from "../../../../../types/api-types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderIngredientDetailsProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
    totalPrice: number
}

const OrderIngredientDetails = ({imagesByIds, orders, totalPrice }: OrderIngredientDetailsProps) => {
    return (
            <div className={clsx(styles.container, "p-1")}>
                {
                    orders.slice(0,1).map(item =>
                        {
                            const ingredients = item.ingredients.map(id => imagesByIds.get(id)) as IngredientShortDto[];
                            const date = item.createAt;
                            const orderStatus = () => {
                                return item.status === "done" ? 'Выполнен' : item.status === 'pending' ? 'Готовится' : null;
                            };
                            return <>
                               <article key={item._id} className={clsx(styles.wrapper)}>
                                   <p className={clsx("text text_type_digits-default mb-5", styles.number)}>{`#${item.number}`}</p>
                                   <h1 className={clsx("text text_type_main-medium mb-1")}>{item.name}</h1>
                                   <span className={clsx(styles.status, "text text_type_main-default")}>{orderStatus()}</span>
                                   <div className={clsx(styles.wrap)}>
                                       <h2 className={clsx("text text_type_main-medium")}>
                                           Состав:
                                       </h2>
                                       <ul className={clsx(styles.list, "custom-scroll mb-7")}>
                                           <li>
                                               {
                                                   ingredients.map(ingredient => {
                                                       return <>
                                                           <div className={clsx(styles.block)}>
                                                               <div className={clsx(styles.inner)}>
                                                                   <img src={ingredient.image} alt={ingredient.name} className={clsx(styles.img)}/>
                                                                   <h3 className={clsx("text text_type_main-small")}>{ingredient.name}</h3>
                                                               </div>
                                                               <p className={clsx("text text_type_main-default")}>{ingredient.count} x
                                                                   {ingredient.price}
                                                               </p>
                                                               <CurrencyIcon type="primary" />
                                                           </div>
                                                       </>
                                                   })
                                               }
                                           </li>
                                       </ul>
                                       <div className={clsx(styles.info)}>
                                           <FormattedDate
                                               className={clsx("text text_type_main-small text_color_inactive")}
                                               date={new Date(date)}/>
                                           <p className={clsx("text text_type_digits-default")}>{totalPrice}</p>
                                           <CurrencyIcon type="primary" />
                                       </div>
                                   </div>
                               </article>
                            </>
                        }
                    )
                }
            </div>
    )
}

export default OrderIngredientDetails;
