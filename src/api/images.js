import images from "../data/images";

const imageArray = Array.from(images).map(([, image]) => image);

export const get = id => images.get(id);

export const getAll = () => imageArray;

export default {
  get,
  getAll
};
