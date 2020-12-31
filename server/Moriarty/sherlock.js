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
  await page.waitForSelector('div.r5a77d');
  const element = await page.$('#sbtc > div.SDkEP > div.a4bIc > input');
  const value = await (await element.getProperty('value')).jsonValue();
  await browser.close();
  return value;
};

const getAltTags = async (data) => {
  console.log('imgArr', data);
  if (data.length === 0) return 'No image links found';
  try {
    data.forEach(async (image) => {
      let tempLink = image.source;
      image.alt = await reverseImage(tempLink);
      const imageAlts = [];
      imageAlts.push(image.alt);
      console.log(imageAlts);
    });
  } catch (error) {
    console.log('Error fetching alt text: ', error);
    throw error;
  }
};

module.exports = getAltTags;
