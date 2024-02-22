import styles from "./app-header.module.css";
import clsx from "clsx";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

function AppHeader() {
  return (
    <header className={clsx(styles.header, "p-4")}>
      <nav className={clsx(styles.wrap)}>
        <div className={clsx(styles.inner)}>
          <NavLink to="/" className={clsx(styles.link)}>
            <BurgerIcon type="primary" />
            <p
              className={clsx(
                "text text_type_main-default ml-2",
                styles.activeLink
              )}
            >
              Конструктор
            </p>
          </NavLink>
          <a href="#" className={clsx(styles.link)}>
            <ListIcon type={"secondary"} />
            <p className={clsx("text text_type_main-default ml-2")}>
              Лента заказов
            </p>
          </a>
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <NavLink to="/login"  className={clsx(styles.link)}>
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
