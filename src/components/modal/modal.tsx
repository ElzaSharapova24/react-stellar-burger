import clsx from "clsx";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import ModalOverlay from "../modal-overlay";
import { createPortal } from "react-dom";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, className }) => {
    const modal: HTMLElement | null = document.getElementById('modal');
    const isVisible = true;

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        if (isVisible) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [isVisible, onClose]);

    return isVisible ? (
        createPortal(
            <ModalOverlay onClose={onClose}>
                <div className={clsx(styles.content, 'p-10')}>
                    <div className={clsx(styles.wrap)}>
                        <h2 className={clsx(className, styles.heading)}>{title}</h2>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </ModalOverlay>,
            modal
        )
    ) : null;
};

// Modal.propTypes = {
//     isVisible: PropTypes.bool,
//     // title: PropTypes.string,
//     // onClose: PropTypes.func,
//     className: PropTypes.string,
// };

export default Modal;
