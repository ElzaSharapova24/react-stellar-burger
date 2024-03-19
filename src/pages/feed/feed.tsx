import clsx from "clsx";
import styles from "./feed.module.css"
import OrderFeed from "./order-feed";
import OrderInformation from "./order-information";
import {IngredientShortDto, TAllOrder} from "../../types/api-types";
import {useEffect} from "react";
import {currentUserOrdersActions, ordersAllActions} from "../../services/middleware/actions";
import {BASE_URL_WS_ORDERS, BASE_URL_WS_ORDERS_ALL} from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import {useDispatch} from "../../services/hooks";

interface FeedProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
    total: number,
    totalToday: number
}

const Feed = ({ imagesByIds, orders, total, totalToday }: FeedProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ordersAllActions.wsConnect({wsUrl: BASE_URL_WS_ORDERS_ALL, withTokenRefresh:false}));
        const accessToken = getCookie("accessToken");
        if (accessToken){
            const correctedToken = accessToken.replace('Bearer ', '');
            const wsUrlOrders = BASE_URL_WS_ORDERS + `?token=${correctedToken}`;
            dispatch(currentUserOrdersActions.wsConnect({wsUrl: wsUrlOrders, withTokenRefresh:true}));
        }
    })


    return(
        <section className={clsx(styles.container)}>
            <OrderFeed imagesByIds={imagesByIds} orders={orders}/>
            <OrderInformation total={total} totalToday={totalToday}/>
        </section>
    )
}

export default Feed;
