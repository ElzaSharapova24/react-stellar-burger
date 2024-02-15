import clsx from "clsx";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClose, children }) {
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
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
