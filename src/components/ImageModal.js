import React, { memo } from "react";
import Modal from "./Modal";
import styles from "./ImageModal.module.css";
import Arrow from "./Arrow";
import ImageLoader from "./ImageLoader";
import useImagePagination from "../hooks/useImagePagination";
import useKeyDown from "../hooks/useKeyDown";

const ImageModal = ({ src, alt, title, ...props }) => {
  const { goToPrevious, goToNext, hasPrevious, hasNext } = useImagePagination();

  useKeyDown("ArrowLeft", goToPrevious);
  useKeyDown("ArrowRight", goToNext);

  return (
    <Modal {...props} className={styles.imageModal}>
      <button
        className={`${styles.navigationButton} light-button`}
        onClick={goToPrevious}
        disabled={!hasPrevious}
      >
        <Arrow direction="left" size="1rem" className={styles.arrow} />
      </button>
      <ImageLoader src={src} alt={alt} title={title} className={styles.image} />
      <button
        className={`${styles.navigationButton} light-button`}
        onClick={goToNext}
        disabled={!hasNext}
      >
        <Arrow direction="right" size="1rem" className={styles.arrow} />
      </button>
    </Modal>
  );
};

export default memo(ImageModal);
