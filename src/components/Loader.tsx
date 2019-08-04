import React, { memo, ReactElement } from "react";
import styles from "./Loader.module.css";

const Loader = (): ReactElement => (
  <div className={styles.spinner} data-testid="loader">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default memo(Loader);
