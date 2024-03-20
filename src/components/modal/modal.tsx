import clsx from "clsx";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {PropsWithChildren, useEffect, useState} from "react";
import ModalOverlay from "./modal-overlay";
import { createPortal } from "react-dom";


interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

const Modal = ({ title, children, onClose, className }: PropsWithChildren<ModalProps>) => {
    const modal = document.getElementById("modal");
    const isVisible = true;

    const [loading, setLoading] = useState<boolean>(false);

    const isLoading = () => {
        setLoading(true);
    };

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === "Escape") {
                onClose();
            }
        }
        if (isVisible) {
            document.addEventListener("keydown", closeByEscape);
            return () => {
                document.removeEventListener("keydown", closeByEscape);
            };
        }
    }, [isVisible, onClose]);

    return isVisible
        ? createPortal(
            <ModalOverlay onClose={onClose} data-cy='modal'>
                <div className={clsx(styles.content, "p-10")}>
                    <div className={clsx(styles.wrap)} data-cy='modal-container'>
                        <h2 className={clsx(className, styles.heading)}>{title}</h2>
                        <button data-cy='close-icon' className={clsx(styles.btn)}>
                            <CloseIcon type="primary" onClick={onClose} />
                        </button>
                    </div>
                    {children}
                </div>
            </ModalOverlay>,
            modal as HTMLDivElement
        )
        : null;
};

export default Modal;
