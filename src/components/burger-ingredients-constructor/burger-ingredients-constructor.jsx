import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients-constructor.module.css"
import clsx from "clsx";

export default function BurgerIngredientsConstructor () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail
      />
      <div className={clsx(style.wrapper)}>
        <div>
          <p>
            2222
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </div>
  )
}
