const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const assetsDirectory = `${__dirname}/../assets/images/`;

fs.readdir(assetsDirectory, (err, files) => {
  files.forEach(file => {
    const { name, ext } = path.parse(`${assetsDirectory}${file}`);

    Jimp.read(`${assetsDirectory}${name}${ext}`)
      .then(image => {
        const { height, width } = image.bitmap;
        const maxHeight = 1024;
        const maxWidth = 768;
        const imagesDirectory = `${__dirname}/../src/images/`;
        const destination = `${imagesDirectory}${name}.jpg`;

        if (height > maxHeight || width > maxWidth) {
          image.scaleToFit(maxWidth, maxHeight).write(destination);
        } else {
          image.writeAsync(destination);
        }

        const thumbnailWidth = 128;
        const thumbnailHeight = thumbnailWidth;
        const thumbnailDestination = `${imagesDirectory}${name}_tn.jpg`;

        image
          .scaleToFit(thumbnailHeight, thumbnailWidth)
          .writeAsync(thumbnailDestination);
      })
      .catch(console.error);
  });
});
