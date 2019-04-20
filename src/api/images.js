import images from "../data/images";

const perPage = 24;
const totalPages = Math.ceil(images.length / perPage);

const get = page => {
  const firstIndex = (page - 1) * perPage;
  const lastIndex = page * perPage;
  const imagesForPage = images.slice(firstIndex, lastIndex);

  return {
    images: imagesForPage,
    page,
    perPage,
    totalPages
  };
};

export default {
  get
};
