import React, { useCallback, useContext, useEffect, memo } from "react";
import CloseButton from "./CloseButton";
import ModalContext from "../contexts/Modal";
import useKeyDown from "../hooks/useKeyDown";
import styles from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  useKeyDown("Escape", onClose);

  const handleCloseClick = useCallback(
    event => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const [, setIsModalOpen] = useContext(ModalContext);

  useEffect(() => {
    setIsModalOpen(true);
    return () => setIsModalOpen(false);
  }, []);

  return (
    <section
      className={styles.modal}
      onClick={handleCloseClick}
      data-testid="modal-container"
    >
      <CloseButton
        onClick={handleCloseClick}
        className={styles.closeButton}
        data-testid="close-button"
      />
      {children}
    </section>
  );
};

export default memo(Modal);
