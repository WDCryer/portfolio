import IImageData from "./ImageData";

export type Image = Pick<
  IImageData,
  "imageSrc" | "description" | "previous" | "next"
>;

export default Image;
