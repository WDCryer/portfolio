import React, { memo } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import CloseButton from "./CloseButton";
import useKeyDown from "../hooks/useKeyDown";

const Modal = ({ children, onClose, className = "", ...props }) => {
  useKeyDown("Escape", onClose);

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
