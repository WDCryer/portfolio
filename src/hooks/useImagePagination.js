import { useContext, useCallback } from "react";
import ImageGalleryContext from "../contexts/image-gallery";
import {
  goToImage,
  goToPreviousImage,
  goToNextImage
} from "../actions/image-gallery";
import PaginationContext from "../contexts/pagination";
import { goToPreviousPage, goToNextPage } from "../actions/pagination";

const useImagePagination = () => {
  const {
    dispatch: dispatchImageAction,
    hasPreviousImage,
    hasNextImage
  } = useContext(ImageGalleryContext);
  const {
    dispatch: dispatchPageAction,
    hasPreviousPage,
    hasNextPage,
    perPage
  } = useContext(PaginationContext);

  const goToPrevious = useCallback(
    event => {
      event.stopPropagation();

      if (hasPreviousImage) {
        dispatchImageAction(goToPreviousImage());
      } else if (hasPreviousPage) {
        dispatchPageAction(goToPreviousPage());
        dispatchImageAction(goToImage(perPage - 1));
      }
    },
    [
      hasPreviousImage,
      dispatchImageAction,
      hasPreviousPage,
      dispatchPageAction,
      perPage
    ]
  );

  const goToNext = useCallback(
    event => {
      event.stopPropagation();

      if (hasNextImage) {
        dispatchImageAction(goToNextImage());
      } else if (hasNextPage) {
        dispatchPageAction(goToNextPage());
        dispatchImageAction(goToImage(0));
      }
    },
    [hasNextImage, dispatchImageAction, hasNextPage, dispatchPageAction]
  );

  return {
    goToPrevious,
    goToNext,
    hasPrevious: hasPreviousImage || hasPreviousPage,
    hasNext: hasNextImage || hasNextPage
  };
};

export default useImagePagination;
