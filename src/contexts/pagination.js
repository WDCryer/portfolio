import { createContext } from "react";

const context = createContext({
  currentPage: 1,
  totalPages: 1,
  hasPreviousPage: false,
  hasNextPage: false,
  dispatch: () => {}
});

export default context;
