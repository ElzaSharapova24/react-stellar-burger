import styles from "./register-page.module.css";
import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


interface UserData {
    email: string;
    password: string;
    name: string;
}

interface RegisterPageProps {
    onRegister: (userData: UserData) => void;
}

const RegisterPage = ({ onRegister }:RegisterPageProps) => {
    const [userData, setUserData] = useState<UserData>({ email: '', password: '', name: '' });
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0);
        alert('Icon Click Callback');
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRegister(userData);
    };

    return (
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
                        value={userData.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={onChange}
                        icon={'CurrencyIcon'}
                        value={userData.email}
                        name={'email'}
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
                        icon="EditIcon"
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Нажми на меня
                    </Button>
                </form>
                <ul className={clsx(styles.list)}>
                    <li className={clsx(styles.item)}>
                        <p className={clsx('text text_type_main-default text_color_inactive')}>Уже зарегистрированы?</p>
                        <Link to="/login" className={clsx(styles.btn, 'text text_type_main-default')}>
                            Войти
                        </Link>
                    </li>
                </ul>
            </section>
        </>
    );
};

RegisterPage.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default RegisterPage;
