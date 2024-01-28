import clsx from "clsx";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";

const Modal = ({ isVisible = false, title,  children, onClose, className }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };
  
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });
  
  return !isVisible ? null : (
    <div className={clsx(styles.modal)} onClick={onClose}>
      <div className={clsx(styles.modalDialog)} onClick={e => e.stopPropagation()}></div>
        <div className={clsx(styles.content, "p-10")}>
          <div className={clsx(styles.wrap)}>
            <h2 className={clsx(className,styles.heading)}>{title}</h2>
            <CloseIcon type={"primary"} onClick={onClose}/>
          </div>
            {children}
        </div>
    </div>
  );
};

export default Modal;

