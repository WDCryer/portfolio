import ThumbnailImage from "./ThumbnailImage";
import Image from "./Image";

interface ImageData {
  readonly fileName: string;
  readonly description: string;
  readonly previous: number;
  readonly next: number;
  readonly id: number;
  readonly imageSrc: string;
  readonly thumbnailSrc: string;
}

export default ImageData;
