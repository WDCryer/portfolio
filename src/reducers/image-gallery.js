import {
  SET_IMAGE,
  PREVIOUS_IMAGE,
  NEXT_IMAGE
} from "../actions/image-gallery";

const reducer = (state, action) => {
  const { currentImage, totalImages } = state;

  const setImage = imageNumber => {
    const currentImage = Math.max(-1, Math.min(totalImages - 1, imageNumber));

    return {
      ...state,
      currentImage,
      hasPreviousImage: currentImage > 0,
      hasNextImage: currentImage < totalImages - 1
    };
  };

  switch (action.type) {
    case SET_IMAGE:
      return setImage(action.payload);
    case PREVIOUS_IMAGE:
      return setImage(currentImage - 1);
    case NEXT_IMAGE:
      return setImage(currentImage + 1);
    default:
      return state;
  }
};

export default reducer;
