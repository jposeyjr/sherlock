const Moriarty = require('./puppet.js');

let commands = {
  image: false,
  button: false,
  article: true,
};

const sherlock = new Moriarty('https://jposeyjr.github.io/', commands);

const getData = async () => {
  const linkData = await sherlock.getData();
  console.log('log data', linkData);
};

getData();

const getImages = async () => {
  const imageData = await sherlock.getImages();
  console.log('image data', imageData);
};

getImages();
