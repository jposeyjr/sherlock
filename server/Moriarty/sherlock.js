const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const reverseImage = async (url) => {
  console.log('in reverse');
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto(
    'https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(url),
    {
      waitUntil: 'networkidle2',
      timeout: 3000,
    }
  );
  //selectors for google image search to grab values after image has been reversed searched
  await page.waitForSelector('div.r5a77d');
  const element = await page.$('#sbtc > div.SDkEP > div.a4bIc > input');
  const value = await (await element.getProperty('value')).jsonValue();
  await browser.close();
  return value;
};

const getAltTags = async (data) => {
  const imageAlts = [];
  if (data.length === 0) return 'No image links found';
  try {
    //looping through array of objects from the Moriarty class to reverse image search on google.
    await Promise.all(
      data.map(async (image) => {
        let tempLink = image.source;
        imageAlts.push((image.alt = await reverseImage(tempLink)));
      })
    );
    return imageAlts;
  } catch (error) {
    console.log('Error fetching alt text: ', error);
    throw error;
  }
};

module.exports = getAltTags;
