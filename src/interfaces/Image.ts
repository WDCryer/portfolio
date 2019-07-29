interface Image {
  fileName: string;
  description: string;
  previous: number;
  next: number;
  id: number;
  imageSrc: string;
  thumbnailSrc: string;
}

export default Image;
