import clsx from "clsx";
import styles from "./feed.module.css"
import OrderFeed from "./order-feed";
import OrderInformation from "./order-information";

const Feed = () => {
    return(
        <section className={clsx(styles.container)}>
            <OrderFeed/>
            <OrderInformation/>
        </section>
    )
}

export default Feed;
