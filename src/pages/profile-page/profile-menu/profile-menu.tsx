import clsx from "clsx";
import {NavLink} from "react-router-dom";
import React from "react";
import {useLocation, useNavigate} from "react-router";
import {useDispatch} from "../../../services/hooks";
import {logoutUser} from "../../../services/slices/routerSlice";
import styles from "./profile-menu.module.css"

const ProfileMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOutBtn = () => {
        dispatch(logoutUser());
        navigate("/");
    };
    const location = useLocation();

    return (
        <div>
            <ul className={clsx(styles.list)}>
                <li className={clsx(styles.wrap)}>
                    <NavLink to={'/profile'} className={clsx("text text_type_main-medium text_color_inactive",{[styles.isActive]: location.pathname === "/profile"})}>Профиль</NavLink>
                </li>
                <li className={clsx( styles.wrap)}>
                    <NavLink to={"/profile/orders"}
                          className={clsx(
                              "text text_type_main-medium text_color_inactive", styles.btn,
                              {[styles.isActive]: location.pathname === "/profile/orders"}
                          )}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={clsx(styles.exitBnt)}>
                    <button
                        onClick={handleSignOutBtn}
                        className={clsx(
                            "text text_type_main-medium text_color_inactive",
                            styles.link
                        )}
                    >
                        Выход
                    </button>
                </li>
            </ul>
            <p
                className={clsx(
                    "text text_type_main-default text_color_inactive mt-10",
                    styles.text
                )}
            >
                В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
            </p>
        </div>
    )
}

export default ProfileMenu;
