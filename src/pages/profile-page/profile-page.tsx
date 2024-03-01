import styles from "./profile-page.module.css";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from "../../services/selectors";
import {useNavigate} from "react-router";
import {authCheck, logoutUser, updateUser} from "../../services/slices/routerSlice";
import {deleteCookie} from "../../utils/cookie";

interface UserData {
    name: string | null;
    email: string | null;
    password: string;
}

const ProfilePage: React.FC = () => {
    const user = useSelector(getAuthData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<UserData>({
        name: user?.user?.name || null,
        email: user?.user?.email || null,
        password: '',
    });
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0);
        alert('Icon Click Callback');
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            updateUser({
                data: {
                    email: userData.email || '',
                    name: userData.name || '',
                },
            })
        );
    };

    const handleSignOutBtn = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    const cancelChanges = () => {
        setUserData({
            name: user?.user?.name || null,
            email: user?.user?.email || null,
            password: '',
        });
    };

    return (
        <>
            <section className={clsx(styles.wrap)}>
                <div>
                    <ul className={clsx(styles.list)}>
                        <li className={clsx('pt-4 pb-4')}>
                            <a className={clsx('text text_type_main-medium')}>Профиль</a>
                        </li>
                        <li className={clsx('pt-4 pb-4')}>
                            <a className={clsx('text text_type_main-medium text_color_inactive')}>История заказов</a>
                        </li>
                        <li className={clsx('pt-4 pb-4')}>
                            <button onClick={handleSignOutBtn} className={clsx('text text_type_main-medium text_color_inactive', styles.link, styles.btn)}>Выход</button>
                        </li>
                    </ul>
                    <p className={clsx('text text_type_main-default text_color_inactive mt-10', styles.text)}>
                        В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
                    </p>
                </div>
                <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        icon={'CurrencyIcon'}
                        value={userData.name || ''}
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
                        value={userData.email || ''}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={userData.password}
                        name={'password'}
                        icon="EditIcon"
                    />
                    <div className={clsx(styles.inner)}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" onClick={cancelChanges}>
                            Отменить
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default ProfilePage;
