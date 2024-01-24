import clsx from "clsx";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector("#modal");


export default function Modal ({title, onClose, children}) {
  return (
    <>
      <div className={clsx(styles.modal)}>
        <h2 className={clsx(title)}>
          {title}
        </h2>
        <CloseIcon type="primary" onClick={onClose}/>
        {children}
      </div>
      <ModalOverlay onClick={onClose}/>
    </>,
      modalRoot
  )
}
