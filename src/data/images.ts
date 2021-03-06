interface Image {
  fileName: string;
  description: string;
}

const imageMetadata: Image[] = [
  {
    fileName: "suri-boy",
    description: "A Suri boy drawn from a photo"
  },
  {
    fileName: "ethiopian-woman",
    description: "Hamar woman drawn from a photo by David Schweitzer"
  },
  {
    fileName: "illuminated-dancer",
    description:
      "A dancer illuminated in 3 different colors of light (drawn from a photo)"
  },
  {
    fileName: "fiver-girl",
    description: "Drawn from a Fiver ad"
  },
  {
    fileName: "dad",
    description: "My dad"
  },
  {
    fileName: "strahd",
    description: "My D&D group in Strahd's castle"
  },
  {
    fileName: "old-car",
    description: "An classic car I saw in my neighborhood"
  },
  {
    fileName: "tire-dragon",
    description:
      "Based on a tire dragon at a playground on Star Island in New Hampshire"
  },
  {
    fileName: "dancer-3",
    description: "A dancer drawn from a photo"
  },
  {
    fileName: "dancer-2",
    description: "A dancer drawn from a photo"
  },
  {
    fileName: "dancer-1",
    description: "A dancer drawn from a photo"
  },
  {
    fileName: "eli",
    description: "A former coworker"
  },
  {
    fileName: "union-guy",
    description:
      "A prospective student at the Union Theological Seminary info session"
  },
  {
    fileName: "andrew",
    description: "A friend"
  },
  {
    fileName: "ruby-sales",
    description: "Civil rights activist Ruby Sales giving a lecture"
  },
  {
    fileName: "bob",
    description: "A former coworker"
  },
  {
    fileName: "danny",
    description: "A former coworker"
  },
  {
    fileName: "dragon-knight-1",
    description: "A dragonborn knight"
  },
  {
    fileName: "dragon-knight-2",
    description: "A dragonborn knight"
  },
  {
    fileName: "dragon-knight-3",
    description: "A dragonborn knight"
  },
  {
    fileName: "robot",
    description: "A robot"
  },
  {
    fileName: "astronaut",
    description: "A space suit I drew in highschool"
  },
  {
    fileName: "hooded-dress",
    description: "A strange dress"
  },
  {
    fileName: "medieval-guy",
    description: "A costume design"
  },
  {
    fileName: "sci-fi-dress-2",
    description: "An avant garde dress"
  },
  {
    fileName: "sci-fi-dress",
    description: "A sci fi outfit"
  }
].map((image, i, images) => ({
  ...image,
  previous: i > 0 ? i - 1 : undefined,
  next: i + 1 < images.length ? i + 1 : undefined,
  id: i,
  imageSrc: require(`../images/${image.fileName}.jpg`),
  thumbnailSrc: require(`../images/${image.fileName}_thumbnail.jpg`)
}));

const images = new Map();

imageMetadata.forEach((image: Image, i: number) => {
  images.set(i, image);
});

export default images;
