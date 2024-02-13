
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import clsx from "clsx";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css"
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ingredientSort} from "../../services/getIngredient/ingredientSlice";

export default function ConstructorItem({bun, fillings, index}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  
  const [{isDragging}, drag] = useDrag({
    type: 'sortItem',
    item: () => {
      return{fillings, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'sortItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      // Time to actually perform the action
      dispatch(ingredientSort({to: dragIndex, from: hoverIndex}))
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  
  drag(drop(ref))
  
  const opacity = isDragging ? 0 : 1;
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
  
        <div className={clsx("custom-scroll", styles.scroll)} >
          {fillings.map((item) => {
            return (
              <div ref={ref} data-handler-id={handlerId} style={{opacity}}  key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  index={index}
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
