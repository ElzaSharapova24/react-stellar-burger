import clsx from "clsx";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import ModalOverlay from "../modal-overlay";
import {createPortal} from "react-dom";


export default function Modal({ isVisible = false, title,  children, onClose, className }) {
  const modal = document.getElementById('modal');
  
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        onClose();
      }
    }
    if(isVisible) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isVisible, onClose])
  
  
  return !isVisible ? null : (
        createPortal(
          <ModalOverlay onClose={onClose} >
            <div className={clsx(styles.content, "p-10")}>
              <div className={clsx(styles.wrap)}>
                <h2 className={clsx(className,styles.heading)}>{title}</h2>
                <CloseIcon type={"primary"} onClick={onClose}/>
              </div>
              {children}
            </div>
          </ModalOverlay>,modal
        )
  );
}

