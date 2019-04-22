import React, { memo, useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Arrow from "./Arrow";
import ImageLoader from "./ImageLoader";
import Modal from "./Modal";
import useKeyDown from "../hooks/useKeyDown";
import { get } from "../api/images";
import styles from "./ImageModal.module.css";

const ImageModal = ({ match, history }) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    setImage(get(Number(match.params.id)));
  }, [match.params.id]);

  const onClose = useCallback(() => history.push("/"), []);

  const isPreviousDisabled = useMemo(() => isNaN(image.previous), [
    image.previous
  ]);
  const isNextDisabled = useMemo(() => isNaN(image.next), [image.next]);
  const previousImageURL = useMemo(() => `/image/${image.previous}`, [
    image.previous
  ]);
  const nextImageURL = useMemo(() => `/image/${image.next}`, [image.next]);
  const goToPrevious = useCallback(() => {
    if (!isPreviousDisabled) history.push(previousImageURL);
  }, [previousImageURL]);
  const goToNext = useCallback(() => {
    if (!isNextDisabled) history.push(nextImageURL);
  }, [nextImageURL]);

  useKeyDown("ArrowLeft", goToPrevious);
  useKeyDown("ArrowRight", goToNext);

  const stopPropagation = useCallback(event => event.stopPropagation(), []);

  return (
    <Modal onClose={onClose}>
      <Link
        to={previousImageURL}
        type="button"
        onClick={stopPropagation}
        className={styles.navigationButton}
        disabled={isPreviousDisabled}
      >
        <Arrow direction="left" size="1rem" className={styles.arrow} />
      </Link>
      <ImageLoader
        src={image.imageSrc}
        alt={image.description}
        title={image.description}
        className={styles.image}
      />
      <Link
        to={nextImageURL}
        type="button"
        onClick={stopPropagation}
        className={styles.navigationButton}
        disabled={isNextDisabled}
      >
        <Arrow direction="right" size="1rem" className={styles.arrow} />
      </Link>
    </Modal>
  );
};

export default memo(ImageModal);
