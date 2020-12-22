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
