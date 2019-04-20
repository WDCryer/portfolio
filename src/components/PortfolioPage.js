import React, { memo, useMemo, useReducer } from "react";
import PaginationContext from "../contexts/pagination";
import ImageGallery from "./ImageGallery";
import Pagination from "./Pagination";
import useURLParam from "../hooks/useURLParam";
import PaginationReducer from "../reducers/pagination";
import imageApi from "../api/images";

const PortfolioPage = () => {
  const [pageParameter] = useURLParam("page", 1);
  const { images, page, perPage, totalPages } = useMemo(
    () => imageApi.get(pageParameter),
    [pageParameter]
  );
  const [pagination, dispatch] = useReducer(PaginationReducer, {
    currentPage: page - 1,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    perPage
  });

  return (
    <PaginationContext.Provider value={{ ...pagination, dispatch }}>
      <section>
        <ImageGallery images={images} />
        <Pagination />
      </section>
    </PaginationContext.Provider>
  );
};

export default memo(PortfolioPage);
