import { useState, useEffect, useCallback } from "react";

const useImageLoader = src => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    setIsLoading(true);
    const image = new Image();
    image.addEventListener("load", handleOnLoad);
    image.src = src;

    return () => {
      image.removeEventListener("load", handleOnLoad);
      image.src = "";
    };
  }, [src]);

  return isLoading ? null : src;
};

export default useImageLoader;
