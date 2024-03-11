import styles from "./order-feed.module.css"
import clsx from "clsx";
import Order from "./order";
import {useSelector} from "../../../services/hooks";
import {getIngredients, getOrder} from "../../../services/selectors";
const OrderFeed = () => {
    const {imagesByIds} = useSelector(getIngredients);
    const {orders} = useSelector(getOrder);
    return (
        <div className={clsx(styles.item)}>
            <h1 className={clsx("text text_type_main-large mt-10 mb-5 pl-2")}>
                Лента заказов
            </h1>
            <ul className={clsx(styles.list, "custom-scroll")}>
                {
                    orders.map(order =>
                    {
                        const images = order.ingredients.map(id => imagesByIds.get(id));
                        return <Order images = {images} item={order} key={order._id}/>
                    })
                }
            </ul>
        </div>
    )
}

export default OrderFeed;
