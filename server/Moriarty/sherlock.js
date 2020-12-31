const { Cluster } = require('puppeteer-cluster');

const getAltTags = async (data) => {
  let count = 0;
  console.log('in reverse', data);
  const imageAlts = [];
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
    puppeteerOptions: [
      { headless: false, args: ['--no-sandbox', '--disable-gpu'] },
    ],
  });
  if (data.length === 0) return 'No image links found';
  await cluster.task(async ({ page, data: url }) => {
    console.log('in cluster', count);
    await page.goto(url);
    // await page.waitForSelector('div.r5a77d');
    //selectors for google image search to grab values after image has been reversed searched
    const element = await page.$('#sbtc > div.SDkEP > div.a4bIc > input');
    imageAlts.push(await (await element.getProperty('value')).jsonValue());
  });
  //looping through array of objects from the Moriarty class to reverse image search on google.

  for (const image of data) {
    count++;
    let tempLink = image.source;
    cluster.queue(
      'https://www.google.com/searchbyimage?image_url=' +
        encodeURIComponent(tempLink)
    );
  }

  await cluster.idle();
  await cluster.close();
  return [data, imageAlts];
};

// const getAltTags = async (data) => {
//   const imageAlts = [];
//   if (data.length === 0) return 'No image links found';
//   try {
//     //looping through array of objects from the Moriarty class to reverse image search on google.
//     await Promise.all(
//       data.map(async (image) => {
//         let tempLink = image.source;
//         imageAlts.push(await reverseImage(tempLink));
//       })
//     );
//     return [data, imageAlts];
//   } catch (error) {
//     console.log('Error fetching alt text: ', error);
//     throw error;
//   }
// };

module.exports = getAltTags;
