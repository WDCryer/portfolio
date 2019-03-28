import { SET_PAGE, PREVIOUS_PAGE, NEXT_PAGE } from "../actions/pagination";

const reducer = (state, action) => {
  const { currentPage, totalPages } = state;
  const setPage = page => {
    const currentPage = Math.max(1, Math.min(totalPages, page));

    return {
      ...state,
      currentPage,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages
    };
  };

  switch (action.type) {
    case SET_PAGE:
      return setPage(action.payload);
    case PREVIOUS_PAGE:
      return setPage(currentPage - 1);
    case NEXT_PAGE:
      return setPage(currentPage + 1);
    default:
      return state;
  }
};

export default reducer;
