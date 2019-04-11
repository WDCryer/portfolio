import { useState, useEffect, useCallback } from "react";

const useImageLoader = src => {
  const [source, setSource] = useState();
  const handleOnLoad = useCallback(() => setSource(src), [src]);

  useEffect(
    () => {
      const image = new Image();
      image.addEventListener("load", handleOnLoad);
      image.src = src;

      return () => {
        image.removeEventListener("load", handleOnLoad);
        image.src = "";
        console.log("canceling image load for ", src);
      };
    },
    [src]
  );

  return source;
};

export default useImageLoader;
