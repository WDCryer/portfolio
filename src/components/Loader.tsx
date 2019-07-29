import React, { memo, ReactElement } from "react";
import styles from "./Loader.module.css";

const Loader = (): ReactElement => (
  <div className={styles.spinner}>
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
