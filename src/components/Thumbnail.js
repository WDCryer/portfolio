import React, { memo } from "react";
import styles from "./Thumbnail.module.css";
import ImageLoader from "./ImageLoader";

const Thumbnail = ({ src, ...props }) => (
  <ImageLoader
    className={styles.thumbnail}
    src={src}
    alt={src}
    draggable="false"
    {...props}
  />
);

export default memo(Thumbnail);
