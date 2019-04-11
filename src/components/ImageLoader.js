import React, { useState, useEffect, memo } from "react";
import Loader from "./Loader";
import useImageLoader from "../hooks/useImageLoader";
import useTimeout from "../hooks/useTimeout";

const ImageLoader = ({ src, alt, ...props }) => {
  const source = useImageLoader(src);
  const showLoader = useTimeout(250);

  if (!showLoader) {
    return undefined;
  } else if (source) {
    return <img src={source} alt={alt} draggable="false" {...props} />;
  } else {
    return <Loader />;
  }
};

export default memo(ImageLoader);
