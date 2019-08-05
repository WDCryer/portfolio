import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement
} from "react";

import Arrow from "./Arrow";
import ImageLoader from "./ImageLoader";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { get } from "../api/images";
import styles from "./ImageModal.module.css";
import useKeyDown from "../hooks/useKeyDown";
import IMatch from "../interfaces/Match";
import IImage from "../interfaces/Image";

interface History {
  push(path: string): void;
}

interface ImageModalProps {
  readonly match: IMatch;
  readonly history: History;
}

const ImageModal = ({ match, history }: ImageModalProps): ReactElement => {
  const [image, setImage]: [IImage, any] = useState({
    description: "",
    imageSrc: "",
    previous: 0,
    next: 0
  });

  useEffect(() => {
    setImage(get(Number(match.params.id)));
  }, [match.params.id]);

  // TODO extract previous and next button to separate components
  const onClose = useCallback(() => history.push("/"), [history]);
  const isPreviousDisabled = isNaN(image.previous);
  const isNextDisabled = isNaN(image.next);
  const previousImageURL = `/image/${image.previous}`;
  const nextImageURL = `/image/${image.next}`;
  const goToPrevious = useCallback(() => {
    if (!isPreviousDisabled) history.push(previousImageURL);
  }, [history, isPreviousDisabled, previousImageURL]);
  const goToNext = useCallback(() => {
    if (!isNextDisabled) history.push(nextImageURL);
  }, [history, isNextDisabled, nextImageURL]);

  useKeyDown("ArrowLeft", goToPrevious);
  useKeyDown("ArrowRight", goToNext);

  const stopPropagation = useCallback(event => event.stopPropagation(), []);

  const previousImage = useMemo(() => get(image.previous), [image.previous]);
  const nextImage = useMemo(() => get(image.next), [image.next]);

  return (
    <Modal onClose={onClose} className={styles.imageModal}>
      {isPreviousDisabled ? null : (
        <Link
          to={previousImageURL}
          type="button"
          onClick={stopPropagation}
          className={`${styles.navigationButton} ${
            styles.previousButton
          } dark-button`}
          data-testid="previous-button"
          style={{
            backgroundImage: `url(${previousImage.thumbnailSrc})`
          }}
        />
      )}
      <ImageLoader
        src={image.imageSrc}
        alt={image.description}
        title={image.description}
        className={styles.image}
      />
      {isNextDisabled ? null : (
        <Link
          to={nextImageURL}
          type="button"
          onClick={stopPropagation}
          className={`${styles.navigationButton} ${
            styles.nextButton
          } dark-button`}
          data-testid="next-button"
          style={{
            backgroundImage: `url(${nextImage.thumbnailSrc})`
          }}
        />
      )}
    </Modal>
  );
};

export default memo(ImageModal);
