import OrderFeed from "../feed/order-feed";
import styles from "./odred-history.module.css";
import clsx from "clsx";
import {IngredientShortDto, TAllOrder} from "../../types/api-types";


interface OrderHistoryProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
}

const OrderHistory = ({ imagesByIds, orders }: OrderHistoryProps) => {
    return (
        <div className={clsx(styles.wrap)}>
            <OrderFeed imagesByIds={imagesByIds} orders={orders}/>
        </div>
    )
}

export default OrderHistory;
