import styles from "./app-header.module.css";
import clsx from "clsx";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
 
 function AppHeader(props) {
  return (
    <header className={clsx(styles.header,  "p-4")}>
      <nav className={clsx(styles.wrap)}>
        <div className={clsx(styles.inner)}>
          <a href="#" className={clsx(styles.link)}>
            <BurgerIcon type="primary" />
            <p className={clsx("text text_type_main-default ml-2")}>Конструктор</p>
          </a>
          <a href="#" className={clsx(styles.link)}>
            <ListIcon type={"secondary"}/>
            <p className={clsx("text text_type_main-default ml-2")}>Лента заказов</p>
          </a>
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <a href="#" className={clsx(styles.link)}>
            <ProfileIcon type="secondary" />
            <p className={clsx("text text_type_main-default ml-2")}>Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  )
 }
 
 export default AppHeader;
