class Moriarty {
  constructor(url, commands) {
    this.url = url;
    this.commands = commands;
    this.data = [];
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
      this.data.push(results);
      await browser.close();
      console.log('browser closed');
    } catch (error) {
      throw error;
    }
  }
  catch(error) {
    throw error;
  } //end of Start Puppet
  async getData() {
    await this.startPuppet();
    // console.log(this.data);
    return this.data;
  }
} //end Moriarty

module.exports = Moriarty;
