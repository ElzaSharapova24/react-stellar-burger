import styles from "./not-found-page.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const NotFoundPage = () => {
    return (
        <div className={clsx(styles.wrap)}>
            <h1 className={clsx(styles.title, "text text_type_digits-large")}>404</h1>
            <h2 className={clsx(styles.subtitle, "text text_type_main-medium")}>
                Page Not Found
            </h2>
            <p className={clsx(styles.text, "text text_type_main-default")}>
                Вернуться на главный экран?
            </p>
            <Link to={"/"}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
                    Вернуться
                </Button>
            </Link>
        </div>
    )
};

export default NotFoundPage;
