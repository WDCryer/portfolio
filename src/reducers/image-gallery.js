import {
  SET_IMAGE,
  PREVIOUS_IMAGE,
  NEXT_IMAGE,
  SET_TOTAL_IMAGES
} from "../actions/image-gallery";
import useURLParams from "../hooks/useURLParams";

const reducer = (state, action) => {
  const [params, setParams] = useURLParams();
  const { currentImage, totalImages } = state;

  const setImage = imageNumber => {
    const currentImage = Math.max(-1, Math.min(totalImages - 1, imageNumber));
    if (currentImage >= 0) {
      params.set("image", currentImage + 1);
    } else {
      params.delete("image");
    }
    setParams(params);

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
    case SET_TOTAL_IMAGES:
      return {
        ...state,
        hasNextImage: state.currentImage < action.payload - 1,
        totalImages: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
