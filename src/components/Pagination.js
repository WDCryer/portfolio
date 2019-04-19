import React, {
  memo,
  useContext,
  useCallback,
  useEffect,
  useMemo
} from "react";
import styles from "./Pagination.module.css";
import PaginationContext from "../contexts/pagination";
import openModalContext from "../contexts/modal-is-open";
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
  const { isModalOpen } = useContext(openModalContext);
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

  const handleKeyDown = useCallback(
    event => {
      if (!isModalOpen) {
        if (event.key === "ArrowLeft" && hasPreviousPage) {
          onPreviousPageClick();
        } else if (event.key === "ArrowRight" && hasNextPage) {
          onNextPageClick();
        }
      }
    },
    [
      isModalOpen,
      hasPreviousPage,
      onPreviousPageClick,
      hasNextPage,
      onNextPageClick
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
            className={`light-button ${styles.activeButton}`}
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
