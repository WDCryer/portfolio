import React, { memo, useReducer } from "react";
import PaginationContext from "../contexts/pagination";
import ImageGallery from "./ImageGallery";
import Pagination from "./Pagination";
import images from "../data/images";
import useURLParams from "../hooks/useURLParams";
import PaginationReducer from "../reducers/pagination";

const PortfolioPage = () => {
  const [params] = useURLParams();
  const currentPage = params.get("page") ? params.get("page") - 1 : 0;
  const totalPages = images.length;
  const [pagination, dispatch] = useReducer(PaginationReducer, {
    currentPage,
    totalPages,
    hasPreviousPage: currentPage > 0,
    hasNextPage: currentPage < totalPages - 1,
    perPage: images[0].length
  });

  return (
    <PaginationContext.Provider value={{ ...pagination, dispatch }}>
      <section>
        <ImageGallery images={images[pagination.currentPage]} />
        <Pagination />
      </section>
    </PaginationContext.Provider>
  );
};

export default memo(PortfolioPage);
