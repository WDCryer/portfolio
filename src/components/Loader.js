import React, { memo } from "react";
import styles from "./Loader.module.css";

const Loader = () => (
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
