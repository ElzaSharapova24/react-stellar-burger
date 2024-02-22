import clsx from "clsx";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import ModalOverlay from "../modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import {useNavigate} from "react-router";

function Modal({ title, children, onClose, className }) {
  const modal = document.getElementById("modal");
  const isVisible = true;

  useEffect(() => {
    function closeByEscape(evt) {
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

  return !isVisible
    ? null
    : createPortal(
        <ModalOverlay onClose={onClose}>
          <div className={clsx(styles.content, "p-10")}>
            <div className={clsx(styles.wrap)}>
              <h2 className={clsx(className, styles.heading)}>{title}</h2>
              <CloseIcon type={"primary"} onClick={onClose} />
            </div>
            {children}
          </div>
        </ModalOverlay>,
        modal
      );
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Modal;
