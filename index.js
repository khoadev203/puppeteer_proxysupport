const puppeteer = require("puppeteer-extra");
const { proxyRequest } = require("puppeteer-proxy");
const config = require("./config.json");
const agents = require("./agents.json");
const fs = require("fs");
const randomName = require("chinese-random-name");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");

var instagramArray = fs.readFileSync("instagram.txt").toString().split("\n");
var proxyArray = fs.readFileSync("proxy.txt").toString().split("\n");

function generateRandomNumber(digit) {
  let min = Math.pow(10, digit - 1);
  return Math.floor(min + Math.random() * 9 * min);
}

function generateRandom(length) {
  return Math.floor(Math.random() * length);
}

function generateRandomSize() {
  let digit = Math.pow(10, 1) % 15;
  let val = 0;
  switch (digit) {
    case 0:
      val = 5;
      break;
    case 1:
      val = 5.5;
      break;
    case 2:
      val = 6;
      break;
    case 3:
      val = 6.5;
      break;
    case 4:
      val = 7;
      break;
    case 5:
      val = 7.5;
      break;
    case 6:
      val = 8;
      break;
    case 7:
      val = 8.5;
      break;
    case 8:
      val = 9;
      break;
    case 9:
      val = 9.5;
      break;
    case 10:
      val = 10;
      break;
    case 11:
      val = 10.5;
      break;
    case 12:
      val = 11;
      break;
    case 13:
      val = 11.5;
      break;
    case 14:
      val = 12;
      break;
  }
  return val.toString();
}

puppeteer.use(StealthPlugin());

(async () => {
  for (let i = 0; i < config.repeatTime; i++) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const randomAgent = agents[Math.floor(Math.random() * agents.length)];
  console.log("Running tests..");
  console.log(randomAgent);

  // for (let i = 0; i < config.repeatTime; i++) {
    const page = await browser.newPage();
    await page.setUserAgent(
      // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
      randomAgent
     )
    const proxyUrl = proxyArray[generateRandom(proxyArray.length - 1)];

    console.log(proxyUrl);
    console.log("Opening page ...");

    // await page.setRequestInterception(true);

    // page.on('request', async (request) => {
    //   await proxyRequest({
    //     page,
    //     proxyUrl: proxyUrl,
    //     request,
    //   });
    // });

    await page.goto(
      "https://sg.club21global.com/club21/nike-sacai-fragment?ltclid=dc522d3e-aef3-4c0a-a655-106e86a9dea7"
    );

    await page.waitForSelector("#field114019327-first"); //first name
    await page.waitForSelector("#field114019327-last"); //last name
    await page.waitForSelector("#field114019328"); //email
    await page.waitForSelector("#field114019329"); //contact number
    await page.waitForSelector("#field114019330"); //instagram
    await page.waitForSelector("#field114019331"); //color select
    await page.waitForSelector("#field114019332"); //size select
    await page.waitForSelector("#field114019333"); //timeslot select
    await page.waitForSelector("#field114019335_1"); //checkbox
    await page.waitForSelector("#fsSubmitButton4491645"); //submit form

    await page.type("#field114019327-first", randomName.surnames.getOne());
    await page.type("#field114019327-last", randomName.names.get());
    await page.type(
      "#field114019328",
      generateRandomNumber(8) + "@slashshots.com"
    );
    await page.type("#field114019329", "6" + generateRandomNumber(7));
    await page.type(
      "#field114019330",
      "@" + instagramArray[generateRandom(instagramArray.length - 1)]
    );

    await page.select(
      "#field114019331",
      generateRandomNumber(1) > 5 ? "Navy" : "Grey"
    );
    await page.select("#field114019332", generateRandomSize());
    await page.select("#field114019333", "27 August, 5pm - 7pm");
    await page.click("#field114019335_1", { clickCount: 1 });
    await page.click('#fsSubmitButton4491645',{clickCount:1});
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.close();
    console.log(`All done. ✨`);
  
  await browser.close();}

})();
