const imagePaths = {};
const importAll = r =>
  r.keys().forEach((item, index) => {
    imagePaths[item.replace("./", "")] = r(item);
  });
importAll(require.context("../images", false, /\.(png|jpe?g|svg)$/));
const images = [];
const perPage = 20;
let currentArray = [];
const totalImages = Object.keys(imagePaths).length / 2;

for (let i = 0; i < 65; i++) {
  if (i % perPage === 0) {
    currentArray = [];
    images.push(currentArray);
  }
  currentArray.push({
    image: imagePaths[`image-${i % totalImages}.jpg`],
    thumbnail: imagePaths[`image-${i % totalImages}_tn.jpg`]
  });
}

export default images;
