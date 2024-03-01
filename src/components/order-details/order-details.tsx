import clsx from "clsx";
import React from "react";
import doneIcon from "../../images/done.svg";
import styles from "./order-details.module.css";

interface OrderDetailsProps {
    order: {
        order: {
            number: string;
        };
    };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <>
            {order && (
                <div className={clsx(styles.wrapper)}>
                    <h2 className={clsx("text text_type_digits-large", styles.title)}>
                        {order.order.number}
                    </h2>
                    <p>идентификатор заказа</p>
                    <img
                        className={clsx(styles.image)}
                        src={doneIcon}
                        alt="Заказ оформлен"
                    />
                    <div>
                        <p className={clsx("mb-2")}>Ваш заказ начали готовить</p>
                        <p className={clsx(styles.text)}>
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderDetails;
