import styles from "./order.module.css"
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

const Order= () => {
    return (
        <li className={clsx(styles.wrap)}>
            <a className={clsx(styles.inner)}>
                <div className={clsx("mt-6 mr-6 ml-6", styles.priceInfo)}>
                    <p className={clsx("text text_type_digits-default")}>#850450</p>
                    <FormattedDate className={clsx("text text_type_main-small text_color_inactive")}  date={new Date()}/>
                </div>
                <h2 className={clsx("mt-6 mr-6 ml-6 text text_type_main-medium")}>vdavscv</h2>
                <div className={clsx("mt-6 mr-6 ml-6 mb-6", styles.price)}>
                    <div className={clsx()}>
                        <img src={""} className={clsx(styles.orderIcons)} alt={""}/>
                        <span className={clsx(styles.orderTime)}>SDVxvdsv</span>
                    </div>
                    <div className={clsx('ml-6')}>
                        <span className={clsx("mr-2 text text_type_digits-medium")}>1111</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </a>
        </li>
    )
}

export default Order;
