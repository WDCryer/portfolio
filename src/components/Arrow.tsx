import React, { memo, ReactElement } from "react";

import styles from "./Arrow.module.css";

interface Props {
  direction: string;
  className?: string;
}

const Arrow = ({ direction = "right", className }: Props): ReactElement => (
  <i className={`${styles.arrow} ${styles[direction]} ${className}`} />
);

export default memo(Arrow);
