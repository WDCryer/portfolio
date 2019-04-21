import React, { memo, useContext, useCallback, useMemo } from "react";
import styles from "./Pagination.module.css";
import PaginationContext from "../contexts/pagination";
import OpenModalContext from "../contexts/modal-is-open";
import {
  goToPage,
  goToPreviousPage,
  goToNextPage
} from "../actions/pagination";
import Arrow from "./Arrow";
import useKeyDown from "../hooks/useKeyDown";

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    dispatch
  } = useContext(PaginationContext);
  const { isModalOpen } = useContext(OpenModalContext);
  const pages = useMemo(() => new Array(totalPages).fill(0).map((_, i) => i), [
    totalPages
  ]);

  const onPageClick = useCallback(
    event => dispatch(goToPage(Number(event.target.value))),
    []
  );

  const onPreviousPageClick = useCallback(
    () => dispatch(goToPreviousPage()),
    []
  );

  const onNextPageClick = useCallback(() => dispatch(goToNextPage()), []);

  const handleLeftArrowDown = useCallback(() => {
    if (!isModalOpen && hasPreviousPage) {
      onPreviousPageClick();
    }
  }, [isModalOpen, hasPreviousPage]);

  const handleRightArrowDown = useCallback(() => {
    if (!isModalOpen && hasNextPage) {
      onNextPageClick();
    }
  }, [isModalOpen, hasNextPage]);

  useKeyDown("ArrowLeft", handleLeftArrowDown);
  useKeyDown("ArrowRight", handleRightArrowDown);

  return (
    <ul className={styles.pagination}>
      <li>
        <button
          disabled={!hasPreviousPage}
          onClick={onPreviousPageClick}
          className="light-button"
          data-testid={"previous-button"}
        >
          <Arrow direction="left" />
        </button>
      </li>
      {pages.map(page => (
        <li key={page}>
          <button
            className={`light-button ${styles.activeButton}`}
            value={page}
            disabled={page === currentPage}
            onClick={onPageClick}
            data-testid={`page-${page + 1}-button`}
          >
            {page + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          disabled={!hasNextPage}
          onClick={onNextPageClick}
          className="light-button"
          data-testid={"next-button"}
        >
          <Arrow />
        </button>
      </li>
    </ul>
  );
};

export default memo(Pagination);
