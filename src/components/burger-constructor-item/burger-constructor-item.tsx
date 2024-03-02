import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ingredientSort } from "../../services/slices/ingredientSlice";
import { useDispatch } from "../../services/hooks";

interface BurgerConstructorItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  index: number;
  handleDeleteIngredient: (item: any) => void;
}

interface IndexHolder {
    index: number
}

const BurgerConstructorItem = ({
  item,
  index,
  handleDeleteIngredient,
}: BurgerConstructorItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "sortItem",
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "sortItem",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (draggedItem : IndexHolder, monitor) => {
      if (!ref.current) {
        return;
      }
      const hoverIndex = index;
      const dragIndex = draggedItem.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(ingredientSort({ to: dragIndex, from: hoverIndex }));

      draggedItem.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      key={item.id}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        // index={index}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteIngredient(item)}
      />
    </div>
  );
};

export default BurgerConstructorItem;
