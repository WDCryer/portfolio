import React, { useCallback, useContext, memo } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import CloseButton from "./CloseButton";
import useKeyDown from "../hooks/useKeyDown";

const Modal = ({ children, onClose, className = "", ...props }) => {
  useKeyDown("Escape", onClose);

  const handleCloseClick = useCallback(
    event => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (
    <div
      className={`${styles.modal} ${className}`}
      onClick={handleCloseClick}
      data-testid="modal-container"
      {...props}
    >
      <CloseButton
        onClick={handleCloseClick}
        className={styles.closeButton}
        data-testid="close-button"
      />
      {children}
    </div>
  );
};

const ModalWithPortal = props =>
  createPortal(<Modal {...props} />, document.getElementById("modal"));

export { Modal as ModalForTests };
export default memo(ModalWithPortal);
