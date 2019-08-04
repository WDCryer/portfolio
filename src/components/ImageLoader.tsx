import React, { memo, ReactElement } from "react";
import Loader from "./Loader";
import useImageLoader from "../hooks/useImageLoader";

interface Props {
  readonly className?: string;
  readonly src: string;
  readonly alt: string;
  readonly title: string;
}

const ImageLoader = ({ src, alt, title, className }: Props): ReactElement => {
  const isLoading: boolean = useImageLoader(src);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <img
        src={src}
        alt={alt}
        title={title}
        className={className}
        draggable={false}
      />
    );
  }
};

export default memo(ImageLoader);
