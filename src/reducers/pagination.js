import { SET_PAGE, PREVIOUS_PAGE, NEXT_PAGE } from "../actions/pagination";
import useURLParam from "../hooks/useURLParam";

const reducer = (state, action) => {
  const { currentPage, totalPages } = state;
  const setPage = page => {
    const currentPage = Math.max(0, Math.min(totalPages - 1, page));
    const [, setPageParam] = useURLParam("page");

    setPageParam(currentPage + 1);

    return {
      ...state,
      currentPage,
      hasPreviousPage: currentPage > 0,
      hasNextPage: currentPage < totalPages - 1
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
