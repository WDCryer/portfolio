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
import ModalIsOpenContext from "../contexts/modal-is-open";
import ImageModal from "./ImageModal";
import ImageGalleryContext from "../contexts/image-gallery";
import ImageGalleryReducer from "../reducers/image-gallery";
import { goToImage, setTotalImages } from "../actions/image-gallery";
import useURLParams from "../hooks/useURLParams";
import { modalIsOpen, modalIsClosed } from "../actions/modal-is-open";


const ImageGallery = ({ images }) => {
  const NO_IMAGE = -1;
  const [params] = useURLParams();
  const { currentPage, hasPreviousPage, hasNextPage } = useContext(
    PaginationContext
  );
  const { isModalOpen, dispatch: dispatchModalAction } = useContext(
    ModalIsOpenContext
  );
  const initialImage = useMemo(() => params.get("image") - 1, [params.get("image")]);
  const totalImages = useMemo(() => images[currentPage - 1].length, [
    images,
    currentPage
  ]);
  const [imageGallery, dispatchImageAction] = useReducer(ImageGalleryReducer, {
    currentImage: isNaN(initialImage) ? NO_IMAGE : initialImage,
    hasPreviousImage: initialImage > 0 || hasPreviousPage,
    hasNextImage: initialImage < totalImages || hasNextPage,
    totalImages,
    imagesPerPage: images[0].length
  });
  const currentImage = useMemo(
    () => images[currentPage - 1][imageGallery.currentImage] || {},
    [images, currentPage, imageGallery.currentImage]
  );

  useEffect(() => {
    dispatchImageAction(setTotalImages(totalImages));
  }, [totalImages]);

  useEffect(() => {
    if (imageGallery.currentImage > NO_IMAGE && !isModalOpen) {
      dispatchModalAction(modalIsOpen());
    } else if (imageGallery.currentImage <= NO_IMAGE && isModalOpen) {
      dispatchModalAction(modalIsClosed());
    }
  }, [imageGallery.currentImage, isModalOpen]);

  const showModal = useCallback(
    index => dispatchImageAction(goToImage(index)),
    [dispatchImageAction, dispatchModalAction]
  );
  const closeModal = useCallback(() => dispatchImageAction(goToImage(NO_IMAGE)), [
    dispatchImageAction
  ]);

  return (
    <ImageGalleryContext.Provider
      value={{ ...imageGallery, dispatch: dispatchImageAction }}
    >
      <div className={styles.imageGallery}>
        {images[currentPage - 1].map(
          ({ thumbnailSrc, description }, i) => (
            <Thumbnail
              key={`thumbnail-${i}`}
              src={thumbnailSrc}
              alt={description}
              title={description}
              onClick={() => showModal(i)}
            />
          )
        )}
        {isModalOpen && (
          <ImageModal
            src={currentImage.imageSrc}
            alt={currentImage.description}
            title={currentImage.description}
            onClose={closeModal}
          />
        )}
      </div>
    </ImageGalleryContext.Provider>
  );
};

export default memo(ImageGallery);
