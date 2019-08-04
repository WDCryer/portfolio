import IImageData from "./ImageData";

type ThumbnailImage = Pick<IImageData, "description" | "id" | "thumbnailSrc">;

export default ThumbnailImage;
