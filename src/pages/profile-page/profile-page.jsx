import styles from "./profile-page.module.css";
import clsx from "clsx";
import { Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from "../../services/selectors";
import {useNavigate} from "react-router";
import {logoutUser} from "../../services/slices/routerSlice";

function ProfilePage() {
  const user = useSelector(getAuthData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputRef = React.useRef(null);
  
  const onChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: user.user.value,
    });
  };
  
  
  console.log(user.user.password)
  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  
  const handleSubmit = e => {
    e.preventDefault();
  }
  
  const handleSignOutBtn = () => {
    dispatch(logoutUser());
  };
  
  return(
    <>
      <section className={clsx(styles.wrap)}>
        <div>
          <ul className={clsx(styles.list)}>
            <li className={clsx("pt-4 pb-4")}>
              <a className={clsx("text text_type_main-medium")}>Профиль</a>
            </li>
            <li className={clsx("pt-4 pb-4")}>
              <a className={clsx("text text_type_main-medium text_color_inactive")}>История заказов</a>
            </li>
            <li className={clsx("pt-4 pb-4")}>
              <button onClick={handleSignOutBtn} className={clsx("text text_type_main-medium text_color_inactive", styles.link)}>Выход</button>
            </li>
          </ul>
          <p className={clsx("text text_type_main-default text_color_inactive mt-10", styles.text)}>
            В&nbsp;этом разделе вы&nbsp;можете
            изменить свои персональные данные
          </p>
        </div>
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'CurrencyIcon'}
            value={user.user.name}
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
            value={user.user.email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"/>
          <PasswordInput
            onChange={onChange}
            value={user.user.password}
            name={'password'}
            icon="EditIcon"/>
        </form>
      </section>
    </>
  )
}

export default ProfilePage;
