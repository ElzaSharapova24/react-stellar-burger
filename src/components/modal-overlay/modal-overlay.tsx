import clsx from "clsx";
import styles from "./modal-overlay.module.css";
import React, {ReactNode} from "react";

interface ModalOverlayProps {
    onClose?: () => void;
    children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
    return (
        <div className={clsx(styles.modal)} onClick={onClose}>
            <div
                className={clsx(styles.modalDialog)}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalOverlay;
