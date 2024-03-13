import styles from "./order-informftion.module.css"
import clsx from "clsx";
import {IngredientShortDto, TAllOrder} from "../../../types/api-types";

interface OrderInformation {
    total:number,
    totalToday: number,
}

const OrderInformation = ({total, totalToday}: OrderInformation) => {
    return (
        <div className={clsx(styles.wrapper, "custom-scroll")}>
            <div className={clsx(styles.inner)}>
                <ul className={clsx(styles.list, styles.doneList)}>
                    <h3 className={clsx("text text_type_main-medium mt-10 mb-5 pl-2")}>
                        Готовы:
                    </h3>
                    <li className={clsx("text text_type_digits-default", styles.text)}>
                        034533
                    </li>
                    <li className={clsx("text text_type_digits-default", styles.text)}>
                        034533
                    </li>

                    <li className={clsx("text text_type_digits-default",styles.text)}>
                        034533
                    </li>

                </ul>
                <ul className={clsx(styles.list)}>
                    <h3 className={clsx("text text_type_main-medium mt-10 mb-5 pl-2")}>
                        В работе:
                    </h3>
                    <li className={clsx("text text_type_digits-default ")}>
                        034533
                    </li>
                    <li className={clsx("text text_type_digits-default ")}>
                        034533
                    </li>
                    <li className={clsx("text text_type_digits-default ")}>
                        034533
                    </li>
                </ul>
            </div>
            <div>
                <p className={clsx("text text_type_main-medium")}>
                    Выполнено за все время:
                </p>
                <p className={clsx("text text_type_digits-large", styles.largeText)}>{total}</p>
            </div>
            <div>
                <p className={clsx("ext text_type_main-medium")}>
                    Выполнено за сегодня:
                </p>
                <p className={clsx("text text_type_digits-large", styles.largeText)}>{totalToday}</p>
            </div>
        </div>
    )
}

export default OrderInformation;
