class Moriarty {
  constructor(url, commands) {
    this.url = url;
    this.commands = commands;
    this.linkData = [];
    this.imageData = [];
  }

  async startPuppet() {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    //Prevents sites from blocking the puppeteer

    const browser = await puppeteer.launch({
      headless: false, //true when prod to hide browser
      args: ['--no-sandbox', '--disable-gpu'],
    }); //end browser
    const page = await browser.newPage();

    await page.goto(this.url, {
      waitUntil: 'networkidle2',
      timeout: 10000, //gives javascript time to load
    }); //end of page.goto (loads the page)
    try {
      let results = await page.$$eval('a', (as) => as.map((a) => a.href));
      this.linkData.push(results);
      console.log('browser closed');
    } catch (error) {
      throw error;
    } //end of link try block

    async function scrollToBottom(timeout, viewport) {
      try {
        await page.evaluate(
          async (timeout, viewport) => {
            await new Promise((resolve, reject) => {
              reject('Error');
              let totalHeight = 0,
                distance = 200,
                maxHeight = window.innerHeight * viewport;
              const timer = setInterval(() => {
                let duration;
                duration += 200;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (
                  totalHeight >= document.body.scrollHeight ||
                  duration >= timeout ||
                  totalHeight >= maxHeight
                ) {
                  clearInterval(timer);
                  resolve();
                }
              }, 200);
            }).catch((err) => {
              console.log(err);
            });
          },
          timeout,
          viewport
        );
      } catch (error) {
        console.log('Error reject', error);
      }
    }
    scrollToBottom(10000, 10);
    //await page.setViewport({ width: 1920, height: 1080 }); //set browser size if testing with headless false
    const imageSources = await page.evaluate(() =>
      Array.from(document.images, (e) => e.src)
    );
    //May use let srcArr = e.src.split('/'); let imageFileName = srcArr[srcArr.length -1];
    const imagesAlt = await page.evaluate(() =>
      Array.from(document.images, (e) => e.alt)
    );
    await browser.close();
    let objArr = [];
    //goes through the two arrays of sources and alt tags to make a new obj arr for easy assignment later
    imageSources.forEach((src, index) => {
      let obj = {};
      obj.source = src;
      obj.alt = imagesAlt[index];
      objArr.push(obj);
    });
    this.imageData = objArr;
  } //end of start puppet

  async getImages() {
    await this.startPuppet();
    return this.imageData;
  }
  async getData() {
    await this.startPuppet();
    // console.log(this.data);
    return this.linkData;
  }
} //end Moriarty

module.exports = Moriarty;
