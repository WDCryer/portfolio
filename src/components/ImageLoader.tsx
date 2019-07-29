import React, { memo, ReactElement } from "react";
import Loader from "./Loader";
import useImageLoader from "../hooks/useImageLoader";

interface Props {
  className?: string;
  src: string;
  alt: string;
  title: string;
}

const ImageLoader = ({ src, alt, title, className }: Props): ReactElement => {
  const isLoading: boolean = useImageLoader(src);

  if (isLoading) {
    return (
      <img
        src={src}
        alt={alt}
        title={title}
        className={className}
        draggable={false}
      />
    );
  } else {
    return <Loader />;
  }
};

export default memo(ImageLoader);
