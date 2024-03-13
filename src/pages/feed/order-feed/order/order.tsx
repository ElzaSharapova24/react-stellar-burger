import styles from "./order.module.css"
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {IngredientShortDto, TAllOrder} from "../../../../types/api-types";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";


interface OrderProps {
    item: TAllOrder,
    imagesByIds: Map<string, IngredientShortDto>,
}

const Order = ({ item, imagesByIds }:OrderProps) => {
    const location = useLocation();
    const images = item.ingredients.map(id => imagesByIds.get(id));
    const {_id} = item;
    const visibleCount = 6;
    const remainingCount = Math.max(images.length - visibleCount, 0);
    const orderStatus = () => {return item.status === "done" ? 'Выполнен' : item.status === 'pending' ? 'Готовится' : null};
    return (
            <li className={clsx(styles.wrap)}>
                <Link to={{ pathname: `/feed/${_id}` }} state={{ backgroundLocation: location }} className={clsx(styles.inner)}>
                    <div className={clsx("mt-6 mr-6 ml-6", styles.priceInfo)}>
                        <p className={clsx("text text_type_digits-default")}>{`#${item._id}`}</p>
                        <FormattedDate className={clsx("text text_type_main-small text_color_inactive")}  date={new Date()}/>
                    </div>
                    <h2 className={clsx("mt-6 mr-6 ml-6 text text_type_main-medium")}>{item.name}</h2>
                    <span className={clsx(styles.status, "text text_type_main-small mt-6 mr-6 ml-6")}>{orderStatus()}</span>
                    <div className={clsx("mt-6 mr-6 ml-6 mb-6", styles.price)}>
                        <ul className={clsx(styles.iconsList)}>
                            {
                                images.filter(e => e !== undefined).slice(0,visibleCount).map((image, i) => {
                                    return <li className={clsx(styles.iconsItem)} key={i}>
                                               <img src={image!.image} className={clsx(styles.orderIcons)} alt={item.name}/>
                                           </li>
                                })
                            }
                            {
                                (remainingCount > 0) && <span className={clsx("text text_type_digits-default", styles.iconCount)}>{`+${remainingCount}`}</span>
                            }

                        </ul>
                        <div className={clsx('ml-6')}>
                            <span className={clsx("mr-2 text text_type_digits-medium")}>1111</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </Link>
            </li>
    )
}

export default Order;
