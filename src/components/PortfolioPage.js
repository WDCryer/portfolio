import React, { memo, useReducer } from "react";
import PaginationContext from "../contexts/pagination";
import ImageGallery from "./ImageGallery";
import Pagination from "./Pagination";
import images from "../data/images";
import useURLParams from "../hooks/useURLParams";
import PaginationReducer from "../reducers/pagination";

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
  return (
    <PaginationContext.Provider
      value={{ ...pagination, dispatch: dispatchPageAction }}
    >
      <section>
        <ImageGallery images={images} />
        <Pagination />
      </section>
    </PaginationContext.Provider>
  );
};

export default memo(PortfolioPage);
