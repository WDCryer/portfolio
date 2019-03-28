import React, { useCallback, useContext, useEffect } from "react";
import Modal from "./Modal";
import styles from "./ImageModal.module.css";
import {
  goToImage,
  goToNextImage,
  goToPreviousImage
} from "../actions/image-gallery";
import ImageGalleryContext from "../contexts/image-gallery";
import PaginationContext from "../contexts/pagination";
import { goToNextPage, goToPreviousPage } from "../actions/pagination";

const ImageModal = ({ src, ...props }) => {
  const {
    dispatch: dispatchImageAction,
    hasPreviousImage,
    hasNextImage,
    totalImages
  } = useContext(ImageGalleryContext);
  const {
    dispatch: dispatchPageAction,
    hasPreviousPage,
    hasNextPage
  } = useContext(PaginationContext);

  const goToPrevious = useCallback(
    event => {
      if (event) event.preventDefault();

      if (hasPreviousImage) {
        dispatchImageAction(goToPreviousImage());
      } else if (hasPreviousPage) {
        dispatchPageAction(goToPreviousPage());
        dispatchImageAction(goToImage(totalImages - 1));
      }
    },
    [hasPreviousImage, dispatchImageAction, hasPreviousPage, dispatchPageAction]
  );

  const goToNext = useCallback(
    event => {
      if (event) event.preventDefault();

      if (hasNextImage) {
        dispatchImageAction(goToNextImage());
      } else if (hasNextPage) {
        dispatchPageAction(goToNextPage());
        dispatchImageAction(goToImage(0));
      }
    },
    [hasNextImage, dispatchImageAction, hasNextPage, dispatchPageAction]
  );

  const handleKeyDown = useCallback(
    event => {
      if (event.key === "ArrowLeft") {
        goToPrevious(event);
      } else if (event.key === "ArrowRight") {
        goToNext(event);
      }
    },
    [goToPrevious, goToNext]
  );

  useEffect(
    () => {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleKeyDown]
  );

  return (
    <Modal {...props}>
      <button
        className={styles.navigationButton}
        onClick={goToPrevious}
        disabled={!hasPreviousImage && !hasPreviousPage}
      >
        {"<"}
      </button>
      <img className={styles.image} src={src} alt={src} draggable="false" />
      <button
        className={styles.navigationButton}
        onClick={goToNext}
        disabled={!hasNextImage && !hasNextPage}
      >
        {">"}
      </button>
    </Modal>
  );
};

export default ImageModal;
