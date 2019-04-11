import React, {
  Fragment,
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
  const [params] = useURLParams();
  const { currentPage, hasPreviousPage, hasNextPage } = useContext(
    PaginationContext
  );
  const { isModalOpen, dispatch: dispatchModalAction } = useContext(
    ModalIsOpenContext
  );
  const initialImage = useMemo(() => params.get("image") - 1, [params]);
  const totalImages = useMemo(() => images[currentPage - 1].length, [
    images,
    currentPage
  ]);
  const [imageGallery, dispatchImageAction] = useReducer(ImageGalleryReducer, {
    currentImage: isNaN(initialImage) ? -1 : initialImage,

    hasPreviousImage: initialImage > 0 || hasPreviousPage,
    hasNextImage: initialImage < totalImages || hasNextPage,
    totalImages
  });

  useEffect(() => {
    const totalImages = images[currentPage - 1].length;
    dispatchImageAction(setTotalImages(totalImages));
  }, [images, currentPage]);

  useEffect(() => {
    if (imageGallery.currentImage > -1 && !isModalOpen) {
      dispatchModalAction(modalIsOpen());
    } else if (imageGallery.currentImage <= -1 && isModalOpen) {
      dispatchModalAction(modalIsClosed());
    }
  }, [imageGallery.currentImage, isModalOpen]);

  const showModal = useCallback(
    index => dispatchImageAction(goToImage(index)),
    [dispatchImageAction, dispatchModalAction]
  );
  const closeModal = useCallback(() => dispatchImageAction(goToImage(-1)), [
    dispatchImageAction,
    dispatchModalAction
  ]);

  return (
    <ImageGalleryContext.Provider
      value={{ ...imageGallery, dispatch: dispatchImageAction }}
    >
      <div className={styles.imageGallery}>
        {images[currentPage - 1].map(
          ({ imageSrc, thumbnailSrc, description }, i) => (
            <Fragment key={`fragment-${i}`}>
              <Thumbnail
                src={thumbnailSrc}
                alt={description}
                title={description}
                onClick={() => showModal(i)}
              />
              {imageGallery.currentImage === i && (
                <ImageModal
                  src={imageSrc}
                  alt={description}
                  title={description}
                  onClose={closeModal}
                />
              )}
            </Fragment>
          )
        )}
      </div>
    </ImageGalleryContext.Provider>
  );
};

export default memo(ImageGallery);
