import React, { memo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose, ...props }) => {
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
    <div className={styles.modal} onClick={onClose} {...props}>
      {children}
    </div>,
    document.getElementById("modal")
  );
};

export default memo(Modal);
