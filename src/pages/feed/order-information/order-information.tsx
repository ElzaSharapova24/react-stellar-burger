import styles from "./order-informftion.module.css"
import clsx from "clsx";

const OrderInformation = () => {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.inner)}>
                <ul className={clsx(styles.list)}>
                    <h3 className={clsx("text text_type_main-medium mt-10 mb-5 pl-2")}>
                        Готовы:
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
                <p className="text text_type_digits-large">12345678</p>
            </div>
            <div>
                <p className={clsx("ext text_type_main-medium")}>
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">1234</p>
            </div>
        </div>
    )
}

export default OrderInformation;
