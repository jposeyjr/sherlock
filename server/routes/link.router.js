const express = require('express');
const router = express.Router();
const timeout = 10000;
const maxBrowsers = 5;
let browsers = 0;

router.post('/', async (req, res) => {
  //puppeteer can fail and needs something to kill it if that happens, this is a good way to do it.
  req.setTimeout(timeout);
  try {
    let data = req.body;
    console.log('data', data);
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

async function getLinkHandler(arg) {
  let puppet = require('../Moriarty/puppet');
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

module.exports = router;
