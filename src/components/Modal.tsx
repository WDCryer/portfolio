import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  ReactElement,
  ReactNode
} from "react";

import CloseButton from "./CloseButton";
import ModalContext from "../contexts/Modal";
import styles from "./Modal.module.css";
import useKeyDown from "../hooks/useKeyDown";

interface Props {
  onClose(): void;
  children?: ReactNode;
  className?: string;
  props?: any[];
}

interface ISetIsModalOpen {
  (isModalOpen: boolean): void;
  (callback: (isModalOpen: boolean) => boolean): void;
} 

const Modal = ({
  onClose,
  children,
  className = "",
  ...props
}: Props): ReactElement => {
  useKeyDown("Escape", onClose);

  const handleCloseClick = useCallback(
    event => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const [, setIsModalOpen] = useContext(ModalContext);

  useEffect((): (() => void) => {
    setIsModalOpen(true);

    return () => setIsModalOpen(false);
  }, [setIsModalOpen]);

  const classNames = useMemo(
    () => [styles.modal, className].filter(c => c).join(" "),
    [className]
  );

  return (
    <section
      className={classNames}
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
    </section>
  );
};

export default memo(Modal);
