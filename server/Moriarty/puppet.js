class Moriarty {
  constructor(args) {
    this.url = args.url;
    this.currentCommands = args.commands;
    this.allImages = [];
    this.allLinks = [];
  }

  async runPuppeteer() {
    //set up puppeteer and adjust for best performance
    const puppeteer = require('puppeteer');
    let commands = [];
    commands = this.currentCommands;
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-gpu'],
    });
    //wait for page to load and block image's from displaying to increase performance
    let page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image'].indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.on('console', (msg) => {
      for (let i = 0; i < msg._args.length; ++i) {
        msg._args[i].jsonValue().then((result) => {
          console.log(result);
        });
      }
    });

    await page.goto(this.url);

    //command center, used to execute multiple commands in async manner
    let commandIndex = 0;
    while (commandIndex < commands.length) {
      try {
        console.log(`command ${commandIndex + 1}/${commands.length}`);
        //making multiple frames to execute commands concurrently
        let frames = page.frames();
        await this.executeCommand(frames[0], commands[commandIndex]);
        await this.sleep(1000);
      } catch (error) {
        console.log(error);
        await browser.close();
        break;
      }
      commandIndex++;
    }
    console.log('done');
    await browser.close();
  }

  async executeCommand(frame, command) {
    console.log(command.type);
    switch (command.type) {
      //grabs all the links from the page
      case 'links':
        try {
          let results = await frame.$$eval('a', (as) => as.map((a) => a.href));
          this.allLinks.push(results);
          return true;
        } catch (error) {
          console.log('Error fetching links', error);
          return false;
        }
      //grabs all images from the page
      case 'images':
        try {
          console.log('in image case');
          async function scrollToBottom(timeout, viewport) {
            await frame.evaluate(
              async (timeout, viewport) => {
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
                  }
                }, 200);
              },
              timeout,
              viewport
            );
          } //scrollToBottom used to make sure we can get all lazy loaded images
          scrollToBottom(10000, 10);

          //creates an array of links from the site
          const imageSources = await frame.evaluate(() =>
            Array.from(document.images, (e) => e.src)
          );
          //creates an array of alt tags from the site
          const imagesAlt = await frame.evaluate(() =>
            Array.from(document.images, (e) => e.alt)
          );
          //combines the two above arrays together into an obj that has matching key value pairs to make life easier for post processing
          let objArr = [];
          imageSources.forEach((src, index) => {
            let obj = {};
            obj.source = src;
            obj.alt = imagesAlt[index];
            objArr.push(obj);
          });
          console.log(objArr);
          this.allImages = objArr;
          return true;
        } catch (error) {
          console.log('error', error);
          return false;
        }
      default:
        return false;
    }
  }

  //used to limit amount of chrome browsers that are opened at one time
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAllImages() {
    await this.runPuppeteer();
    return this.allImages;
  }

  async getAllLinks() {
    await this.runPuppeteer();
    return this.allLinks;
  }
}

module.exports = { Moriarty };
