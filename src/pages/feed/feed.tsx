import clsx from "clsx";
import styles from "./feed.module.css"
import OrderFeed from "./order-feed";
import OrderInformation from "./order-information";
import {IngredientShortDto, TAllOrder} from "../../types/api-types";

interface FeedProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
    total: number,
    totalToday: number
}

const Feed = ({ imagesByIds, orders, total, totalToday }: FeedProps) => {
    return(
        <section className={clsx(styles.container)}>
            <OrderFeed imagesByIds={imagesByIds} orders={orders}/>
            <OrderInformation total={total} totalToday={totalToday}/>
        </section>
    )
}

export default Feed;
