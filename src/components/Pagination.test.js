import React from "react";
import { render, getByTestId } from "react-testing-library";
import PaginationContext from "../contexts/pagination";
import {
  goToPage,
  goToPreviousPage,
  goToNextPage
} from "../actions/pagination";
import Pagination from "./Pagination";
import { fireEvent } from "react-testing-library/dist";

describe("Pagination component", () => {
  let dispatch;
  let paginationContextProps;

  beforeEach(() => {
    dispatch = jest.fn();
    paginationContextProps = {
      currentPage: 0,
      totalPages: 3,
      hasPreviousPage: false,
      hasNextPage: true,
      dispatch
    };
  });

  it("should render without crashing", () => {
    render(<Pagination />);
  });

  describe("previous button", () => {
    it("should be disabled when you are on the first page", () => {
      const component = render(
        <PaginationContext.Provider value={paginationContextProps}>
          <Pagination />
        </PaginationContext.Provider>
      );
      const previousButton = getByTestId(
        component.container,
        "previous-button"
      );

      fireEvent.click(previousButton);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it("should be enabled when you are not on the first page", () => {
      const component = render(
        <PaginationContext.Provider
          value={{
            ...paginationContextProps,
            hasPreviousPage: true,
            currentPage: 2
          }}
        >
          <Pagination />
        </PaginationContext.Provider>
      );

      const previousButton = getByTestId(
        component.container,
        "previous-button"
      );

      fireEvent.click(previousButton);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(goToPreviousPage());
    });
  });

  describe("next button", () => {
    it("should be disabled when you are on the last page", () => {
      const component = render(
        <PaginationContext.Provider
          value={{
            ...paginationContextProps,
            currentPage: 3,
            hasPreviousPage: true,
            hasNextPage: false
          }}
        >
          <Pagination />
        </PaginationContext.Provider>
      );
      const nextButton = getByTestId(component.container, "next-button");

      fireEvent.click(nextButton);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it("should be enabled when you are not on the last page", () => {
      const component = render(
        <PaginationContext.Provider value={paginationContextProps}>
          <Pagination />
        </PaginationContext.Provider>
      );
      const nextButton = getByTestId(component.container, "next-button");

      fireEvent.click(nextButton);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(goToNextPage());
    });
  });

  it("should not allow you to click on the button for the current page", () => {
    const component = render(
      <PaginationContext.Provider value={paginationContextProps}>
        <Pagination />
      </PaginationContext.Provider>
    );
    const page1Button = getByTestId(component.container, "page-1-button");

    fireEvent.click(page1Button);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("should allow you to click on the button for a different page", () => {
    const component = render(
      <PaginationContext.Provider value={paginationContextProps}>
        <Pagination />
      </PaginationContext.Provider>
    );
    const page2Button = getByTestId(component.container, "page-2-button");

    fireEvent.click(page2Button);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(goToPage(1));
  });
});
