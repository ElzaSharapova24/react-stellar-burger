import styles from "./login.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import AppHeader from "../../components/app-header";
import {useNavigate} from "react-router";



function Login({onlogin}) {
  let navigate = useNavigate();
  const [form, setValue] = useState({ email: '', password: '' });
  
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  
  return (
    <>
      <section className={clsx(styles.wrap)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
          <form className={clsx(styles.form)}>
            <Input
              type={'text'}
              placeholder={'Email'}
              onChange={onChange}
              icon={'CurrencyIcon'}
              value={form.email}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"/>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"/>
            <Button htmlType="button" type="primary" size="medium">
              Нажми на меня
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


// Login.propTypes = {
// };

export default Login;
