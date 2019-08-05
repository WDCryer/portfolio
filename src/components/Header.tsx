import React, { ReactElement } from "react";
import styles from "./Header.module.css";

const Header = (): ReactElement => (
  <header className={styles.header}>
    <h1>Gallery</h1>
  </header>
);

export default Header;
