
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import clsx from "clsx";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css"


export default function ConstructorItem({bun, fillings}) {
  return(
      <React.Fragment >
        {
          bun && <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}/>
        }
   
           <div className={clsx("custom-scroll", styles.scroll)}>
             {fillings.map((item) => {
               return (
            <div>
              <DragIcon type="primary" />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
         )
        })
        }
           </div>
        {
          bun && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}/>
        }
      </React.Fragment>
    
  )
  
}
