import React, { useReducer } from "react";
import PaginationContext from "../contexts/pagination";
import ImageGallery from "./ImageGallery";
import Pagination from "./Pagination";
import images from "../data/images";
import PaginationReducer from "../reducers/pagination";

const PortfolioPage = () => {
  const [pagination, dispatch] = useReducer(PaginationReducer, {
    currentPage: 1,
    totalPages: 7,
    perPage: 10,
    hasPreviousPage: false,
    hasNextPage: true
  });
  return (
    <PaginationContext.Provider value={{ ...pagination, dispatch }}>
      <section id="portfolio">
        <header>Portfolio</header>
        <ImageGallery images={images} />
        <Pagination />
      </section>
    </PaginationContext.Provider>
  );
};

export default PortfolioPage;
