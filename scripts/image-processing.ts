const fs = require("fs");
const path = require("path");
// TODO get or create Jimp types
const Jimp = require("jimp");

const assetsDirectory: string = `${__dirname}/../assets/images/`;

interface IDimensions {
  readonly height: number;
  readonly width: number;
}

interface IImage {
  scaleToFit(height: number, width: number): IImage;
  writeAsync(destination: string): IImage;
  readonly bitmap: IDimensions;
}

interface ICreateImage {
  readonly image: IImage;
  readonly destination: string;
}

const createThumbnail = ({ image, destination }: ICreateImage): void => {
  const thumbnailWidth: number = 192;
  const thumbnailHeight: number = thumbnailWidth;

  image.scaleToFit(thumbnailHeight, thumbnailWidth).writeAsync(destination);
};

const createImage = ({ image, destination }: ICreateImage) => {
  const { height, width }: IDimensions = image.bitmap;
  const maxHeight: number = 1024;
  const maxWidth: number = 768;
  const isTooTall: boolean = height > maxHeight;
  const isTooWide: boolean = width > maxWidth;

  if (isTooTall || isTooWide) {
    image.scaleToFit(maxWidth, maxHeight).writeAsync(destination);
  } else {
    image.writeAsync(destination);
  }
};

interface IProcessImage {
  readonly image: IImage;
  readonly name: string;
}

const processImage = ({ image, name }: IProcessImage): void => {
  const imagesDirectory: string = `${__dirname}/../src/images/`;
  const destination: string = `${imagesDirectory}${name}.jpg`;

  if (name.includes("thumbnail")) {
    createThumbnail({
      image,
      destination
    });
  } else {
    createImage({
      image,
      destination
    });
  }
};

const processFile = (file: string): void => {
  const { name, ext } = path.parse(`${assetsDirectory}${file}`);

  Jimp.read(`${assetsDirectory}${name}${ext}`)
    .then((image: IImage): void => processImage({ image, name }))
    .catch(console.error);
};

fs.readdir(
  assetsDirectory,
  (_, files: string[]): void => {
    files.forEach(processFile);
  }
);
