import React, {
  memo,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
  useContext
} from "react";
import styles from "./ImageGallery.module.css";
import OpenModalContext from "../contexts/modal-is-open";
import ImageLoader from "./ImageLoader";
import ImageModal from "./ImageModal";
import ImageGalleryContext from "../contexts/image-gallery";
import ImageGalleryReducer from "../reducers/image-gallery";
import { goToImage, setTotalImages } from "../actions/image-gallery";
import useURLParam from "../hooks/useURLParam";
import { openModal, closeModal } from "../actions/modal-is-open";

const ImageGallery = ({ images }) => {
  const { isModalOpen, dispatch: dispatchModalAction } = useContext(
    OpenModalContext
  );
  const [imageParameter] = useURLParam("image", 0);
  const [imageGallery, dispatchImageAction] = useReducer(ImageGalleryReducer, {
    currentImage: imageParameter - 1,
    hasPreviousImage: imageParameter > 0,
    hasNextImage: imageParameter < images.length - 1,
    totalImages: images.length
  });
  const openImage = useMemo(() => images[imageGallery.currentImage] || {}, [
    images,
    imageParameter
  ]);

  useEffect(() => dispatchImageAction(setTotalImages(images.length)), [
    images.length
  ]);

  useEffect(() => {
    if (imageParameter > 0 && !isModalOpen) {
      dispatchModalAction(openModal());
    } else if (!imageParameter && isModalOpen) {
      dispatchModalAction(closeModal());
    }
  }, [imageParameter, isModalOpen]);

  const showImage = useCallback(
    index => () => dispatchImageAction(goToImage(index)),
    [dispatchImageAction]
  );
  const hideImage = useCallback(() => dispatchImageAction(goToImage(-1)), [
    dispatchImageAction
  ]);

  return (
    <ImageGalleryContext.Provider
      value={{ ...imageGallery, dispatch: dispatchImageAction }}
    >
      <div className={styles.imageGallery}>
        {images.map(({ thumbnailSrc, description, id }, i) => (
          <ImageLoader
            key={`thumbnail-${id}-${i}`}
            src={thumbnailSrc}
            alt={description}
            title={description}
            className={styles.thumbnail}
            onClick={showImage(i)}
          />
        ))}
        {isModalOpen && (
          <ImageModal
            id={openImage.id}
            src={openImage.imageSrc}
            alt={openImage.description}
            title={openImage.description}
            onClose={hideImage}
          />
        )}
      </div>
    </ImageGalleryContext.Provider>
  );
};

export default memo(ImageGallery);
