import styles from "./login-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";




function LoginPage({onLogin}) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const inputRef = React.useRef(null);
  
  const onChange = e => {
    const {name, value} = e.target;
    setUserData({ ...userData, [name]: value});
  };
  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!userData.email || ! userData.password) {
      return;
    }
    onLogin(userData)
  }
  
  return (
    <>
      <section className={clsx(styles.wrap)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
        <div>{message}</div>
          <form className={clsx(styles.form)} onSubmit={handleSubmit}>
            <Input
              type={'text'}
              placeholder={'Email'}
              onChange={onChange}
              icon={'CurrencyIcon'}
              value={userData.email}
              name={'email'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"/>
            <PasswordInput
              onChange={onChange}
              value={userData.password}
              name={'password'}
              icon="EditIcon"/>
            <Button htmlType="submit" type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </form>
        <ul className={clsx(styles.list)}>
          <li className={clsx(styles.item)}>
            <p className={clsx('text text_type_main-default text_color_inactive')}>Вы — новый пользователь?</p>
            <Link to="/register" className={clsx(styles.btn, "text text_type_main-default")}>
              Зарегистрироваться
            </Link>
          </li>
         <li className={clsx(styles.item)}>
           <p className={clsx('text text_type_main-default text_color_inactive')}>Забыли пароль?</p>
           <Link to="/forgot-password" className={clsx(styles.btn, "text text_type_main-default")}>
             Восстановить пароль
           </Link>
         </li>
        </ul>
      </section>
    </>
  )
}


LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
