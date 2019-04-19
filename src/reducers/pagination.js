import { SET_PAGE, PREVIOUS_PAGE, NEXT_PAGE } from "../actions/pagination";
import useURLParams from "../hooks/useURLParams";

const reducer = (state, action) => {
  const { currentPage, totalPages } = state;
  const setPage = page => {
    const currentPage = Math.max(0, Math.min(totalPages - 1, page));
    const [urlParams, setURLParams] = useURLParams();
    urlParams.set("page", currentPage + 1);
    setURLParams(urlParams);

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
