import React, {
  memo,
  useCallback,
  useContext,
  useEffect
} from "react";
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
import Arrow from "./Arrow";
import ImageLoader from "./ImageLoader";

const ImageModal = ({ src, alt, title, ...props }) => {
  const {
    dispatch: dispatchImageAction,
    hasPreviousImage,
    hasNextImage,
    imagesPerPage
  } = useContext(ImageGalleryContext);
  const {
    dispatch: dispatchPageAction,
    hasPreviousPage,
    hasNextPage
  } = useContext(PaginationContext);
  const goToPrevious = useCallback(() => {
    if (hasPreviousImage) {
      dispatchImageAction(goToPreviousImage());
    } else if (hasPreviousPage) {
      dispatchPageAction(goToPreviousPage());
      dispatchImageAction(goToImage(imagesPerPage - 1));
    }
  }, [
      hasPreviousImage,
      dispatchImageAction,
      hasPreviousPage,
      dispatchPageAction
    ]);

  const goToNext = useCallback(() => {
    if (hasNextImage) {
      dispatchImageAction(goToNextImage());
    } else if (hasNextPage) {
      dispatchPageAction(goToNextPage());
      dispatchImageAction(goToImage(0));
    }
  }, [hasNextImage, dispatchImageAction, hasNextPage, dispatchPageAction]);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    },
    [goToPrevious, goToNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Modal
      {...props}
      className={styles.imageModal}
    >
      <button
        className={`${styles.navigationButton} light-button`}
        onClick={goToPrevious}
        disabled={!hasPreviousImage && !hasPreviousPage
        }
      >
        <Arrow direction="left" size="1rem" className={styles.arrow} />
      </button>
      < ImageLoader src={src} alt={alt} title={title} className={styles.image} />
      <button
        className={`${styles.navigationButton} light-button`}
        onClick={goToNext}
        disabled={!hasNextImage && !hasNextPage}
      >
        <Arrow direction="right" size="1rem" className={styles.arrow} />
      </button>
      < /Modal>
    );
  };
  
  export default memo(ImageModal);
