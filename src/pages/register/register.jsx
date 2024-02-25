import styles from "./register.module.css";
import React, {useState} from "react";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


function Register({onRegister}) {
  const [userData, setUserData] = React.useState({email: '', password: '', login: ''});
  const inputRef = React.useRef(null);
  const [message, setMessage] = useState('');
  
  const onChange = e => {
    setUserData({  ...userData, [e.target.name]: e.target.value  });
    console.log(userData)
  }
  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    onRegister(userData)
  }
  
  return(
    <>
      <section className={clsx(styles.wrapper)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
        <div>{message}</div>
          <form className={clsx(styles.form)} onSubmit={handleSubmit}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              icon={'CurrencyIcon'}
              value={userData.email}
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
              onChange={onChange}
              icon={'CurrencyIcon'}
              value={userData.login}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <PasswordInput
              placeholder={'Пароль'}
              onChange={onChange}
              value={userData.password}
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
