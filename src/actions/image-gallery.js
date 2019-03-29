export const SET_IMAGE = "SET_IMAGE";
export const NEXT_IMAGE = "NEXT_IMAGE";
export const PREVIOUS_IMAGE = "PREVIOUS_IMAGE";
export const SET_TOTAL_IMAGES = "SET_TOTAL_IMAGES";

export const goToImage = imageNumber => ({
  type: SET_IMAGE,
  payload: imageNumber
});
export const goToNextImage = () => ({ type: NEXT_IMAGE });
export const goToPreviousImage = () => ({ type: PREVIOUS_IMAGE });
export const setTotalImages = totalImages => ({
  type: SET_TOTAL_IMAGES,
  payload: totalImages
});
