const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

interface IDimensions {
  height: number;
  width: number;
}

const assetsDirectory: string = `${__dirname}/../assets/images/`;

fs.readdir(assetsDirectory, (_, files: object[]) => {
  files.forEach(file => {
    const { name, ext } = path.parse(`${assetsDirectory}${file}`);

    Jimp.read(`${assetsDirectory}${name}${ext}`)
      .then(image => {
        const { height, width }: IDimensions = image.bitmap;
        const maxHeight: number = 1024;
        const maxWidth: number = 768;
        const imagesDirectory: string = `${__dirname}/../src/images/`;
        const destination: string = `${imagesDirectory}${name}.jpg`;

        if (height > maxHeight || width > maxWidth) {
          image.scaleToFit(maxWidth, maxHeight).write(destination);
        } else {
          image.writeAsync(destination);
        }

        const thumbnailWidth: number = 128;
        const thumbnailHeight: number = thumbnailWidth;
        const thumbnailDestination: string = `${imagesDirectory}${name}_tn.jpg`;

        image
          .scaleToFit(thumbnailHeight, thumbnailWidth)
          .writeAsync(thumbnailDestination);
      })
      .catch(console.error);
  });
});
