import React, { memo, ReactElement } from "react";
import { Route, Link } from "react-router-dom";
import styles from "./ImageGallery.module.css";
import ImageLoader from "./ImageLoader";
import ModalPortal from "./ModalPortal";
import ImageModal from "./ImageModal";
import IThumbnailImage from "../interfaces/ThumbnailImage";

interface Props {
  readonly images: IThumbnailImage[];
}

const ImageGallery = ({ images }: Props): ReactElement => (
  <div className={styles.imageGallery}>
    {images.map(({ thumbnailSrc, description, id }) => (
      <Link
        to={`/image/${id}`}
        key={`thumbnail-${id}`}
        data-testid={`thumbnail-${id}`}
      >
        <ImageLoader
          src={thumbnailSrc}
          alt={description}
          title={description}
          className={styles.thumbnail}
        />
      </Link>
    ))}
    <ModalPortal>
      <Route exact path="/image/:id" component={ImageModal} />
    </ModalPortal>
  </div>
);

export default memo(ImageGallery);
