import React, { memo, useReducer, useCallback, useState } from "react";
import styles from "./ImageGallery.module.css";
import Thumbnail from "./Thumbnail";
import ImageModal from "./ImageModal";
import ImageGalleryContext from "../contexts/image-gallery";
import ImageGalleryReducer from "../reducers/image-gallery";
import { goToImage } from "../actions/image-gallery";

const ImageGallery = ({ images }) => {
  const [imageGallery, dispatch] = useReducer(ImageGalleryReducer, {
    currentImage: -1,
    hasPreviousImage: false,
    hasNextImage: true,
    totalImages: images.length
  });

  const showModal = useCallback(index => dispatch(goToImage(index)), [
    dispatch
  ]);
  const closeModal = useCallback(() => dispatch(goToImage(-1)), [dispatch]);

  return (
    <ImageGalleryContext.Provider value={{ ...imageGallery, dispatch }}>
      <div className={styles.imageGallery}>
        {images.map((props, i) => (
          <>
            <Thumbnail
              key={`thumbnail-${i}`}
              {...props}
              onClick={() => showModal(i)}
            />
            {imageGallery.currentImage === i && (
              <ImageModal
                key={`image-modal-${i}`}
                onClose={closeModal}
                {...props}
              />
            )}
          </>
        ))}
      </div>
    </ImageGalleryContext.Provider>
  );
};

export default memo(ImageGallery);
