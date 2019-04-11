import React, { memo } from "react";
import styles from "./Arrow.module.css";

const Arrow = ({ direction = "right", size = "3px", className = "" }) => (
  <i
    className={`${styles.arrow} ${styles[direction]} ${className}`}
    style={{
      borderWidth: `0 ${size} ${size} 0`,
      padding: size
    }}
  />
);

export default memo(Arrow);
