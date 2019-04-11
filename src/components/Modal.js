import React, { memo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import CloseButton from "./CloseButton";

const Modal = ({ children, onClose, className = "", ...props }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div
      className={`${styles.modal} ${className}`}
      onClick={onClose}
      {...props}
    >
      <CloseButton
        onClick={onClose}
        className={`${styles.closeButton} light-button`}
      />
      {children}
    </div>,
    document.getElementById("modal")
  );
};

export default memo(Modal);
