import clsx from "clsx";
import styles from "./modal.module.css"

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";


// export default function Modal ({children, onClose })  {
//   const [isVisible, setIsVisible] = useState(false);
//
//   // const handleKeydown = ({ key }) => {
//   //   switch (key) {
//   //     case 'Escape':
//   //       onClose();
//   //       break;
//   //     default:
//   //   }
//   // };
//
//   const handleClickVisible = (e) => {
//     e.stopPropagation();
//
//     setIsVisible(!isVisible);
//
//   }
//
//   React.useEffect(() => {
//     document.addEventListener('keydown', handleClickVisible);
//     return () => document.removeEventListener('keydown', handleClickVisible);
//   });
//
//
//   return handleClickVisible ? null :(
//     <div className={clsx(styles.modal)} onClick={onClose}>
//       <div className={clsx(styles.modalDialog)} onClick={handleClickVisible}>
//         <CloseIcon type={"primary"} onClick={onClose}/>
//           <div>{children}</div>
//       </div>
//     </div>
//   );
// };

const Modal = ({ isVisible = false, children, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };
  
  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });
  
  return !isVisible ? null : (
    <div className={clsx(styles.modal)} onClick={onClose}>
      <div className={clsx(styles.modalDialog)} onClick={e => e.stopPropagation()}></div>
        <div className={clsx(styles.modalBody)}>
          <CloseIcon type={"primary"} onClick={onClose}/>
          <div className={clsx()}>
            {children}</div>
        </div>
    </div>
  );
};

export default Modal;

