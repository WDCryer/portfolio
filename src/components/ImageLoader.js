import React, { useState, useEffect, useCallback, memo } from "react";
import Loader from "./Loader";

const ImageLoader = ({ src, alt, ...props }) => {
  const [source, setSource] = useState();
  const [isWaiting, setIsWaiting] = useState(true);
  const handleOnLoad = useCallback(() => {
    setIsWaiting(false);
    setSource(src);
  }, [src]);

  useEffect(() => {
    const image = new Image();
    image.addEventListener("load", handleOnLoad);
    image.src = src;

    return () => {
      image.removeEventListener("load", handleOnLoad);
    };
  }, [src]);

  useEffect(() => {
    const waitTimer = setTimeout(() => {
      setIsWaiting(false);
    }, 400);

    return () => {
      clearTimeout(waitTimer);
    };
  }, [isWaiting]);

  return isWaiting ? (
    undefined
  ) : source ? (
    <img src={source} alt={alt} draggable="false" {...props} />
  ) : (
    <Loader />
  );
};

export default memo(ImageLoader);
