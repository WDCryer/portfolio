import React, { memo } from "react";
import Loader from "./Loader";
import useImageLoader from "../hooks/useImageLoader";

const ImageLoader = ({ src, alt, ...props }) => {
  const source = useImageLoader(src);

  if (source) {
    return <img src={source} alt={alt} draggable="false" {...props} />;
  } else {
    return <Loader />;
  }
};

export default memo(ImageLoader);
