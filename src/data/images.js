const basePath = "./images";

const imageCount = new Array(9).fill(1);
const images = [
  "2015-07-21 11.35.41.jpg",
  "IMG_0034.jpg",
  "IMG_20161112_214537.jpg",
  "IMG_20161112_214553.jpg",
  "IMG_20161112_214606.jpg",
  "IMG_20181104_212258.jpg",
  "IMG_20181223_183148.jpg",
  "IMG_20181223_183209.jpg",
  "IMG_20181227_150604.jpg",
  "Image0110.jpg"
].map((image, i) => ({
  src: `${basePath}/${image}`,
  key: i
}));

export default images;
