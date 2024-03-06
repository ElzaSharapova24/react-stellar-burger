import OrderFeed from "../feed/order-feed";
import styles from "./odred-history.module.css";
import clsx from "clsx";

const OrderHistory = () => {
    return (
        <div className={clsx(styles.wrap)}>
            <OrderFeed/>
        </div>
    )
}

export default OrderHistory;
