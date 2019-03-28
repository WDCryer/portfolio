import React, { memo, useState } from "react";
import styles from "./Thumbnail.module.css";

const Thumbnail = ({ src, ...props }) => (
  <img
    className={styles.thumbnail}
    src={src}
    alt={src}
    draggable="false"
    {...props}
  />
);

export default memo(Thumbnail);
