import styles from "./register.module.css";
import React from "react";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header";
import {Link} from "react-router-dom";


function Register() {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  
  return(
    <>
      <section className={clsx(styles.wrapper)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
          <form className={clsx(styles.form)}>
            <Input
              type={'text'}
              placeholder={'Имя'}
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
              placeholder={'E-mail'}
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
              placeholder={'Пароль'}
              onChange={onChange}
              value={value}
              name={'password'}
              icon="EditIcon"/>
            <Button htmlType="button" type="primary" size="medium">
              Нажми на меня
            </Button>
          </form>
        <ul className={clsx(styles.list)}>
          <li className={clsx(styles.item)}>
            <p className={clsx('text text_type_main-default text_color_inactive')}>Уже зарегистрированы?</p>
            <Link to="/login" className={clsx(styles.btn, "text text_type_main-default")}>Войти</Link>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Register;
