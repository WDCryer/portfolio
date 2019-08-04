import React, { memo, ReactElement } from "react";

import styles from "./Arrow.module.css";

export type Direction = "right" | "left" | "up" | "down";
interface Props {
  readonly direction: Direction;
  readonly className?: string;
}

const Arrow = ({
  direction = "right",
  className = ""
}: Props): ReactElement => (
  <i className={`${styles.arrow} ${styles[direction]} ${className}`} />
);

export default memo(Arrow);
