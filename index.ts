import puppeteer, { Browser } from "puppeteer";

const url = "https://www.okinawastory.jp/event/";

import express from "express";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(express.json());

const port = 4000;

// Define a type for the data that will be scraped
interface ScrapeParams {
  siteURLClass: string;
  mainLoopClass: string;
  titleClass: string;
  imageClass: string;
  locationClass: string;
  descriptionClass: string;
}

app.post("/api/v1/scrapping-site", async (req, res) => {
  try {
    const {
      siteURLClass,
      mainLoopClass,
      titleClass,
      imageClass,
      locationClass,
      descriptionClass,
    } = req.body;

    const clientData = req.body;
    console.log("Client data", clientData);

    const data = await scrapeWebsiteData({
      siteURLClass,
      mainLoopClass,
      titleClass,
      imageClass,
      locationClass,
      descriptionClass,
    });

    return res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error scraping data" });
  }
});

app.get("/api/v1/get-json", (req, res) => {
  // This route would serve the scraped data from a stored JSON file or variable.
  // Implement your logic here.
});

const scrapeWebsiteData = async ({
  siteURLClass,
  mainLoopClass,
  titleClass,
  imageClass,
  locationClass,
  descriptionClass,
}: ScrapeParams) => {
  const browser: Browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(siteURLClass);

  // You may need to wait for the elements to load
  await page.waitForSelector(mainLoopClass);

  const scrapeLogic = (mainLoopClass: string, titleClass: string, imageClass: string, locationClass: string, descriptionClass: string) => {
    // const eventArticles = Array.from(document.querySelectorAll(mainLoopCSS));
    const eventArticles = Array.from(document.querySelectorAll(mainLoopClass));

    return eventArticles.map((evt) => {
      // image css
      const imageUrl = evt.querySelector(imageClass.toString())?.getAttribute("src");

      // title css
      const title = evt.querySelector(titleClass)?.textContent;

      // location css
      const location = evt.querySelector(locationClass)?.textContent;

      // description css
      const details = evt.querySelector(descriptionClass)?.textContent;
      // If there are other <p> tags with different classes, fetch them here

      // return title, imageurl, location, details
      return { title, imageUrl, location, details };
    });
  }

  // Execute the scrape logic in the page context
  const eventData = await page.evaluate(scrapeLogic, mainLoopClass, titleClass, imageClass, locationClass, descriptionClass);
  await browser.close();
  
  return eventData;
};

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
