const express = require('express');
const PORT = 5000;
const app = express();
let timeout = 100000;
let browsers = 0;
let maxBrowsers = 5;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/images', async (req, res) => {
  req.setTimeout(timeout);
  try {
    let data = req.body;
    console.log(req.body.url);
    while (browsers === maxBrowsers) {
      await sleep(1000);
    }
    await getImageHandler(data).then((result) => {
      let response = {
        msg: 'got images',
        images: result,
      };
      console.log('done fetching images');
      res.send(response);
    });
  } catch (error) {
    //try
    res.send({ error: error.toString() });
  }
});

app.post('/api/links', async (req, res) => {
  req.setTimeout(timeout);
  try {
    let data = req.body;
    console.log(req.body.url);
    while (browsers === maxBrowsers) {
      await sleep(1000);
    }
    await getLinkHandler(data).then((result) => {
      let response = {
        msg: 'got links',
        links: result,
      };
      console.log('done fetching links');
      res.send(response);
    });
  } catch (error) {
    //try
    res.send({ error: error.toString() });
  }
});

async function getImageHandler(arg) {
  let puppet = require('./Moriarty/puppet');
  let Moriarty = new puppet.Moriarty(arg);
  browsers += 1;
  try {
    let imageData = await Moriarty.getAllImages().then((result) => {
      return result;
    });
    browsers -= 1;
    return imageData;
  } catch (error) {
    browsers -= 1;
    console.log('Error getting images from site', error);
  }
}

async function getLinkHandler(arg) {
  let puppet = require('./Moriarty/puppet');
  let Moriarty = new puppet.Moriarty(arg);
  browsers += 1;
  try {
    let linkData = await Moriarty.getAllLinks().then((result) => {
      return result;
    });
    browsers -= 1;
    return linkData;
  } catch (error) {
    browsers -= 1;
    console.log('Error getting links from site', error);
  }
}

function sleep(ms) {
  console.log('max browsers open need to wait');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(PORT);
console.log('Running on port: ', PORT);
