export const SET_IMAGE = "SET_IMAGE";
export const NEXT_IMAGE = "NEXT_IMAGE";
export const PREVIOUS_IMAGE = "PREVIOUS_IMAGEe";

export const goToImage = image_number => ({
  type: SET_IMAGE,
  payload: image_number
});
export const goToNextImage = () => ({ type: NEXT_IMAGE });
export const goToPreviousImage = () => ({ type: PREVIOUS_IMAGE });
