import styles from "./profile.module.css";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header";
import {Link} from "react-router-dom";

function Profile() {
  const [value, setValue] = React.useState('Email');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  const onChange = e => {
    setValue(e.target.value);
  };
  return(
    <><AppHeader/>
      <section className={clsx(styles.wrap)}>
        <div>
          <ul className={clsx(styles.list)}>
            <li className={clsx("pt-4 pb-4")}>
              <a className={clsx("ext text_type_main-medium")}>Профиль</a>
            </li>
            <li className={clsx("pt-4 pb-4")}>
              <a className={clsx("ext text_type_main-medium")}>История заказов</a>
            </li>
            <li className={clsx("pt-4 pb-4")}>
              <Link to="/login" className={clsx("ext text_type_main-medium", styles.link)}>Выход</Link>
            </li>
          </ul>
          <p className={clsx("text text_type_main-default text_color_inactive mt-10", styles.text)}>
            В&nbsp;этом разделе вы&nbsp;можете
            изменить свои персональные данные
          </p>
        </div>
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
          <PasswordInput
            onChange={onChange}
            value={'password'}
            name={'password'}
            icon="EditIcon"/>
        </form>
      </section>
    </>
  )
}

export default Profile;
