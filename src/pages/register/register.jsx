import styles from "./register.module.css";
import React from "react";
import clsx from "clsx";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";


function Register() {
  const [value, setValue] = React.useState('password')
  const onChange = e => {
    setValue(e.target.value)
  }
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  
  return(
    <section>
      <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <form>
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
            value={value}
            name={'password'}
            icon="EditIcon"/>
          <Button htmlType="button" type="primary" size="medium">
            Нажми на меня
          </Button>
        </form>
      </div>
      <ul>
        <li>
          <p>Уже зарегистрированы?</p>
          <a>Войти</a>
        </li>
      </ul>
    </section>
  )
}

export default Register;
