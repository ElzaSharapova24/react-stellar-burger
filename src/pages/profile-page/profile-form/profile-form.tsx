import clsx from "clsx";
import styles from "./profile-form.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import {updateUser} from "../../../services/slices/routerSlice";
import {useDispatch, useSelector} from "../../../services/hooks";
import {getAuthData} from "../../../services/selectors";

interface UserData {
    name: string | null;
    email: string | null;
    password: string;
}

const ProfileForm = () => {
    const user = useSelector(getAuthData);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<UserData>({
        name: user?.user?.name || null,
        email: user?.user?.email || null,
        password: "",
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0);
        alert("Icon Click Callback");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            updateUser({
                email: userData.email || "",
                name: userData.name || "",
            })
        );
    };
    const cancelChanges = () => {
        setUserData({
            name: user?.user?.name || null,
            email: user?.user?.email || null,
            password: "",
        });
    };
    return (
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChange}
                icon={"CurrencyIcon"}
                value={userData.name || ""}
                name={"name"}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
            />
            <Input
                type={"text"}
                placeholder={"E-mail"}
                onChange={onChange}
                icon={"CurrencyIcon"}
                value={userData.email || ""}
                name={"email"}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
            />
            <PasswordInput
                onChange={onChange}
                value={userData.password}
                name={"password"}
                icon="EditIcon"
            />
            <div className={clsx(styles.inner)}>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    onClick={cancelChanges}
                >
                    Отменить
                </Button>
            </div>
        </form>
    )
}

export default ProfileForm;
