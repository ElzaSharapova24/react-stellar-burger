import clsx from "clsx";
import styles from "./modal-overlay.module.css"

function ModalOverlay({onClose, children}) {
  
  return (
    <div className={clsx(styles.modal)} onClick={onClose}>
      <div className={clsx(styles.modalDialog)} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalOverlay
