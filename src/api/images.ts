import images from "../data/images";
import IImage from "../interfaces/Image";

const imageArray: IImage[] = Array.from(images).map(([, image]) => image);

export const get: (id: number) => IImage = (id: number) => images.get(id);

export const getAll: () => IImage[] = () => imageArray;

export default {
  get,
  getAll
};
