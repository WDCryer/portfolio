export const SET_PAGE = "SET_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";

export const goToPage = page => ({ type: SET_PAGE, payload: page });
export const goToNextPage = () => ({ type: NEXT_PAGE });
export const goToPreviousPage = () => ({ type: PREVIOUS_PAGE });
