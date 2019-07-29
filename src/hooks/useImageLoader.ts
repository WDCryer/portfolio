import { useState, useEffect, useCallback } from "react";

const useImageLoader = (src: string): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad: () => void = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    setIsLoading(true);

    const image: HTMLImageElement = new Image();

    image.addEventListener("load", handleOnLoad);
    image.src = src;

    return () => {
      image.removeEventListener("load", handleOnLoad);
      image.src = "";
    };
  }, [handleOnLoad, src]);

  return isLoading;
};

export default useImageLoader;
