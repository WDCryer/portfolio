import { MODAL_IS_OPEN, MODAL_IS_CLOSED } from "../actions/modal-is-open";

const reducer = (state, action) => {
  switch (action.type) {
    case MODAL_IS_OPEN:
      return true;
    case MODAL_IS_CLOSED:
      return false;
    default:
      return state;
  }
};

export default reducer;
