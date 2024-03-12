import clsx from "clsx";
import styles from "./feed.module.css"
import OrderFeed from "./order-feed";
import OrderInformation from "./order-information";
import {IngredientShortDto, TAllOrder} from "../../types/api-types";

interface FeedProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
}

const Feed = ({ imagesByIds, orders }: FeedProps) => {
    return(
        <section className={clsx(styles.container)}>
            <OrderFeed imagesByIds={imagesByIds} orders={orders}/>
            <OrderInformation/>
        </section>
    )
}

export default Feed;
