import images from "../data/images";
import IImageData from "../interfaces/ImageData";

const imageArray: IImageData[] = Array.from(images).map(([, image]) => image);

export const get: (id: number) => IImageData = (id: number) => images.get(id);

export const getAll: () => IImageData[] = () => imageArray;

export default {
  get,
  getAll
};
