import styles from "./reset-password-page.module.css";
import React from "react";
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  const [value, setValue] = React.useState('');
  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  
  const inputRef = React.useRef(null);
  
  return(
      <section className={clsx(styles.wrapper)}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Сбросить пароль</h1>
        <form className={clsx(styles.form)}>
          <Input
            type={'text'}
            placeholder={'Укажите e-mail'}
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
          <Button htmlType="button" type="primary" size="small">
            Сбросить
          </Button>
        </form>
      </section>
  )

}

export default ResetPasswordPage;
