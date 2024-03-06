import styles from "./order-feed.module.css"
import clsx from "clsx";
import Order from "./order";

const OrderFeed = () => {
    return (
        <div className={clsx(styles.item)}>
            <h1 className={clsx("text text_type_main-large mt-10 mb-5 pl-2")}>
                Лента заказов
            </h1>
            <ul className={clsx(styles.list, "custom-scroll")}>
                <Order/>
                <Order/>
                <Order/>
                <Order/>
            </ul>
        </div>
    )
}

export default OrderFeed;
