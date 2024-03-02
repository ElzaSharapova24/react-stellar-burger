import styles from "./forgot-password-page.module.css";
import clsx from "clsx";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

const ForgotPasswordPage = () => {
  const [value, setValue] = useState<string>("Email");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <>
      <section className={clsx(styles.wrap)}>
        <h1 className={clsx("text", "text_type_main-medium")}>
          Восстановление пароля
        </h1>
        <form className={clsx(styles.form)}>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setValue(e.target.value)}
            icon={"CurrencyIcon"}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Button htmlType="button" type="primary" size="medium">
            Нажми на меня
          </Button>
        </form>
        <ul className={clsx(styles.list)}>
          <li className={clsx(styles.item)}>
            <p
              className={clsx(
                "text text_type_main-default text_color_inactive"
              )}
            >
              Вспомнили пароль?
            </p>
            <Link
              to="/register"
              className={clsx(styles.btn, "text text_type_main-default")}
            >
              Войти
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
