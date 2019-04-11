import React, { memo, useReducer } from "react";
import PaginationContext from "../contexts/pagination";
import ModalIsOpenContext from "../contexts/modal-is-open";
import ImageGallery from "./ImageGallery";
import Pagination from "./Pagination";
import images from "../data/images";
import useURLParams from "../hooks/useURLParams";
import PaginationReducer from "../reducers/pagination";
import ModalIsOpenReducer from "../reducers/modal-is-open";

const PortfolioPage = () => {
  const [params] = useURLParams();
  const initialPage = Number(params.get("page")) || 1;
  const totalPages = images.length;
  const [pagination, dispatchPageAction] = useReducer(PaginationReducer, {
    currentPage: initialPage,
    totalPages,
    hasPreviousPage: initialPage > 1,
    hasNextPage: initialPage < totalPages
  });
  const [isModalOpen, dispatchModalAction] = useReducer(
    ModalIsOpenReducer,
    false
  );
  return (
    <PaginationContext.Provider
      value={{ ...pagination, dispatch: dispatchPageAction }}
    >
      <ModalIsOpenContext.Provider
        value={{ isModalOpen, dispatch: dispatchModalAction }}
      >
        <section>
          <ImageGallery images={images} />
          <Pagination />
        </section>
      </ModalIsOpenContext.Provider>
    </PaginationContext.Provider>
  );
};

export default memo(PortfolioPage);
