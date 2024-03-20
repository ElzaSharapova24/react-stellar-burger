import styles from "./app-header.module.css";
import clsx from "clsx";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import {useLocation} from "react-router";

const AppHeader = () => {
    const location = useLocation();
    return (
        <header className={clsx(styles.header, "p-4")}>
            <nav className={clsx(styles.wrap)}>
                <div className={clsx(styles.inner)}>
                    <NavLink to="/" className={clsx(styles.link, {[styles.activeLink]: location.pathname === "/"})}>
                        <BurgerIcon type="secondary" />
                        <p className={clsx("text text_type_main-default ml-2")}>
                            Конструктор
                        </p>
                    </NavLink>
                    <NavLink to={"/feed"} className={clsx(styles.link, {[styles.activeLink]: location.pathname === "/feed"})}>
                        <ListIcon type={"secondary"} />
                        <p className={clsx("text text_type_main-default ml-2")}>
                            Лента заказов
                        </p>
                    </NavLink>
                </div>
                <div>
                    <Logo />
                </div>
                <div>
                    <NavLink to="/profile" className={clsx(styles.link, {[styles.activeLink]: location.pathname === "/profile"})} data-cy='profile-btn'>
                        <ProfileIcon type="secondary" />
                        <p className={clsx("text text_type_main-default ml-2")}>
                            Личный кабинет
                        </p>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;
