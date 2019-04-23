import React, { memo } from "react";

import styles from "./Arrow.module.css";

const Arrow = ({ direction = "right", className = "" }) => (
  <i className={`${styles.arrow} ${styles[direction]} ${className}`} />
);

export default memo(Arrow);
