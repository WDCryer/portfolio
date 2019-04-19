import React, {
  memo,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
  useContext
} from "react";
import styles from "./ImageGallery.module.css";
import Thumbnail from "./Thumbnail";
import PaginationContext from "../contexts/pagination";
import openModalContext from "../contexts/modal-is-open";
import ImageModal from "./ImageModal";
import ImageGalleryContext from "../contexts/image-gallery";
import ImageGalleryReducer from "../reducers/image-gallery";
import { goToImage, setTotalImages } from "../actions/image-gallery";
import useURLParams from "../hooks/useURLParams";
import { openModal, closeModal } from "../actions/modal-is-open";


const ImageGallery = ({ images }) => {
  const NO_IMAGE = -1;
  const [params] = useURLParams();
  const { hasPreviousPage, hasNextPage } = useContext(
    PaginationContext
  );
  const { isModalOpen, dispatch: dispatchModalAction } = useContext(
    openModalContext
  );
  const initialImage = Number(params.get('image'));
  const [imageGallery, dispatchImageAction] = useReducer(ImageGalleryReducer, {
    currentImage: isNaN(initialImage) ? NO_IMAGE : initialImage - 1,
    hasPreviousImage: initialImage > 0 || hasPreviousPage,
    hasNextImage: initialImage < images.length || hasNextPage,
    totalImages: images.length
  });
  const currentImage = useMemo(
    () => images[imageGallery.currentImage] || {},
    [images, imageGallery.currentImage]
  );

  useEffect(() => {
    dispatchImageAction(setTotalImages(images.length));
  }, [images.length]);

  useEffect(() => {
    if (imageGallery.currentImage > NO_IMAGE && !isModalOpen) {
      dispatchModalAction(openModal());
    } else if (imageGallery.currentImage <= NO_IMAGE && isModalOpen) {
      dispatchModalAction(closeModal());
    }
  }, [imageGallery.currentImage, isModalOpen]);

  const showImage = useCallback(
    index => dispatchImageAction(goToImage(index)),
    [dispatchImageAction]
  );
  const hideImage = useCallback(
    () => dispatchImageAction(goToImage(NO_IMAGE)),
    [dispatchImageAction]);

  return (
    <ImageGalleryContext.Provider
      value={{ ...imageGallery, dispatch: dispatchImageAction }}
    >
      <div className={styles.imageGallery}>
        {images.map(
          ({ thumbnailSrc, description }, i) => (
            <Thumbnail
              key={`thumbnail-${i}`}
              src={thumbnailSrc}
              alt={description}
              title={description}
              onClick={() => showImage(i)}
            />
          )
        )}
        {isModalOpen && (
          <ImageModal
            src={currentImage.imageSrc}
            alt={currentImage.description}
            title={currentImage.description}
            onClose={hideImage}
          />
        )}
      </div>
    </ImageGalleryContext.Provider>
  );
};

export default memo(ImageGallery);
