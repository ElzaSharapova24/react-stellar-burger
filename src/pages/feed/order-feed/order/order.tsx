import styles from "./order.module.css"
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {TAllOrder} from "../../../../types/api-types";
import {Link} from "react-router-dom";


interface OrderProps {
    item: TAllOrder,
    images: (string | undefined)[]
}

const Order= ({ item, images }:OrderProps) => {
    const visibleCount = 6;
    const remainingCount = Math.max(images.length - visibleCount, 0);
    return (
        <li className={clsx(styles.wrap)}>
            <a className={clsx(styles.inner)}>
                <div className={clsx("mt-6 mr-6 ml-6", styles.priceInfo)}>
                    <p className={clsx("text text_type_digits-default")}>{`#${item._id}`}</p>
                    <FormattedDate className={clsx("text text_type_main-small text_color_inactive")}  date={new Date()}/>
                </div>
                <h2 className={clsx("mt-6 mr-6 ml-6 text text_type_main-medium")}>{item.name}</h2>
                <div className={clsx("mt-6 mr-6 ml-6 mb-6", styles.price)}>
                    <ul className={clsx(styles.iconsList)}>
                        {
                            images.slice(0,visibleCount).map((image, i) => {
                                return <li className={clsx(styles.iconsItem)} key={i}>
                                    <Link to={''}>
                                        <img src={image} className={clsx(styles.orderIcons)} alt={item.name}/>

                                    </Link>
                                </li>

                            })
                        }
                        {
                            (remainingCount > 0) && <span className={clsx("text text_type_digits-default", styles.iconCount)}>{`+${remainingCount}`}</span>
                        }

                        {/*<span className={clsx(styles.orderTime)}>{item.status}</span>*/}
                    </ul>
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
