import React, { memo, useContext, useCallback, useMemo } from "react";
import styles from "./Pagination.module.css";
import PaginationContext from "../contexts/pagination";
import {
  goToPage,
  goToPreviousPage,
  goToNextPage
} from "../actions/pagination";
import Arrow from "./Arrow";

const Pagination = x => {
  const {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    dispatch
  } = useContext(PaginationContext);
  const pages = useMemo(
    () => new Array(totalPages).fill(0).map((_, i) => i + 1),
    [totalPages]
  );
  const onPageClick = useCallback(
    event => dispatch(goToPage(Number(event.target.value))),
    []
  );
  const onPreviousPageClick = useCallback(
    () => dispatch(goToPreviousPage()),
    []
  );
  const onNextPageClick = useCallback(() => dispatch(goToNextPage()), []);

  return (
    <ul className={styles.pagination}>
      <li>
        <button
          disabled={!hasPreviousPage}
          onClick={onPreviousPageClick}
          className="light-button"
        >
          <Arrow direction="left" />
        </button>
      </li>
      {pages.map(page => (
        <li key={page}>
          <button
            className="light-button"
            value={page}
            disabled={page === currentPage}
            onClick={onPageClick}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          disabled={!hasNextPage}
          onClick={onNextPageClick}
          className="light-button"
        >
          <Arrow />
        </button>
      </li>
    </ul>
  );
};

export default memo(Pagination);
