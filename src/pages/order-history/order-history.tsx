import OrderFeed from "../feed/order-feed";
import styles from "./odred-history.module.css";
import clsx from "clsx";
import {IngredientShortDto, TAllOrder} from "../../types/api-types";
import {useDispatch} from "../../services/hooks";
import {useEffect} from "react";
import {currentUserOrdersActions} from "../../services/middleware/actions";
import {BASE_URL_WS_ORDERS} from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import ProfileMenu from "../profile-page/profile-menu";


interface OrderHistoryProps {
    imagesByIds: Map<string, IngredientShortDto>,
    orders: TAllOrder[],
}

const OrderHistory = ({ imagesByIds, orders }: OrderHistoryProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = getCookie("accessToken");
        if (accessToken){
            const correctedToken = accessToken.replace('Bearer ', '');
            const wsUrlOrders = BASE_URL_WS_ORDERS + `?token=${correctedToken}`;
            dispatch(currentUserOrdersActions.wsConnect({wsUrl: wsUrlOrders, withTokenRefresh:true}));
        }
        return () => {
            dispatch(currentUserOrdersActions.wsDisconnect());
        }
    }, [])
    return (
        <section className={clsx(styles.wrap)}>
            <ProfileMenu/>
            <OrderFeed imagesByIds={imagesByIds} orders={orders} title={'История заказов'} orderLinkFunc={id => `/profile/orders/${id}`}/>
        </section>
    )
}

export default OrderHistory;
