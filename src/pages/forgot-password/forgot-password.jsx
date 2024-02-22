import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import React from "react";

function ForgotPassword() {
  const [value, setValue] = React.useState('Email')
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  
  return(
    <><AppHeader/>
      <section className={clsx(styles.wrap)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
        <form className={clsx(styles.form)}>
          <Input
            type={'text'}
            placeholder={'placeholder'}
            onChange={e => setValue(e.target.value)}
            icon={'CurrencyIcon'}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"/>
          <Button htmlType="button" type="primary" size="medium">
            Нажми на меня
          </Button>
        </form>
        <ul className={clsx(styles.list)}>
          <li className={clsx(styles.item)}>
            <p>Вспомнили пароль?</p>
            <Link to="/register">
              Войти
            </Link>
          </li>
        </ul>
      </section>
    </>
  )

}

export default ForgotPassword
