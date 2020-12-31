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
      console.log('done fetching images', result);
      res.send(response);
    });
  } catch (error) {
    res.send({ error: error.toString() });
  }
});
//bulk of the work is done here, used to call the Moriarty class and get data from the web.
async function getImageHandler(arg) {
  let puppet = require('../Moriarty/puppet');
  let getAltTags = require('../Moriarty/sherlock');
  let Moriarty = new puppet.Moriarty(arg);
  browsers += 1;
  try {
    //used to get data to then search google for the images and will add word search TODO ** add word count algo
    let tempData = await Moriarty.getAllImages().then((result) => {
      return result;
    });
    let imageData = await getAltTags(tempData).then((result) => {
      return result;
    });
    //cleaning up browsers
    browsers -= 1;
    return imageData;
  } catch (error) {
    browsers -= 1;
    console.log('Error getting images from site', error);
  }
}
//used to prevent overloading
function sleep(ms) {
  console.log('max browsers open need to wait');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = router;
