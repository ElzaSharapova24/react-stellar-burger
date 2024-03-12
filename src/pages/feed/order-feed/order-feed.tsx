import styles from "./order-feed.module.css"
import clsx from "clsx";
import Order from "./order";
import {useSelector} from "../../../services/hooks";
import {getIngredients, getOrder} from "../../../services/selectors";
import "../feed";
import {IngredientShortDto, TAllOrder} from "../../../types/api-types";
interface OrderFeedProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders:TAllOrder[],
}

const OrderFeed = ({ imagesByIds, orders }: OrderFeedProps) => {
    return (
        <div className={clsx(styles.item)}>
            <h1 className={clsx("text text_type_main-large mt-10 mb-5 pl-2")}>
                Лента заказов
            </h1>
            <ul className={clsx(styles.list, "custom-scroll")}>
                {
                    orders.map(order =>
                        <Order imagesByIds={imagesByIds} item={order} key={order._id}/>
                    )
                }
            </ul>
        </div>
    )
}

export default OrderFeed;
