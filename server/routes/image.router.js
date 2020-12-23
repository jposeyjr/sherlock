const express = require('express');
const router = express.Router();

const timeout = 10000;
const maxBrowsers = 5;
let browsers = 0;

router.post('/', async (req, res) => {
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

async function getImageHandler(arg) {
  let puppet = require('../Moriarty/puppet');
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

function sleep(ms) {
  console.log('max browsers open need to wait');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = router;
