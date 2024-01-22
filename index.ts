import puppeteer, { Browser } from "puppeteer";

const url = "https://www.okinawastory.jp/event/";

import express from "express";

const app = express();
app.use(express.json());

const port = 4000;

app.post("/api/v1/scrapping-data", async (req, res) => {
  try {
    const {
      siteURL,
      mainLoopCSS,
      titleCSS,
      imageCSS,
      locationCSS,
      descriptionCSS,
    } = req.body;

    const clientData = req.body;
    console.log("Client data", clientData);

    const data = await scrapeWebsiteData({
      siteURL,
      mainLoopCSS,
      titleCSS,
      imageCSS,
      locationCSS,
      descriptionCSS,
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
  siteURL,
  mainLoopCSS,
  titleCSS,
  imageCSS,
  locationCSS,
  descriptionCSS,
}: {
  siteURL: string;
  mainLoopCSS: string;
  titleCSS: string;
  imageCSS: string;
  locationCSS: string;
  descriptionCSS: string;
}) => {
  const browser: Browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(siteURL);

  // You may need to wait for the elements to load
  await page.waitForSelector(mainLoopCSS);

  const eventData = await page.evaluate(() => {
    const eventArticles = Array.from(document.querySelectorAll(mainLoopCSS));

    return eventArticles.map((evt) => {
      // image css
      const imageUrl = evt.querySelector(imageCSS)?.getAttribute("src");

      // title css
      const title = evt.querySelector(titleCSS)?.textContent;

      // location css
      const location = evt.querySelector(locationCSS)?.textContent;

      // description css
      const details = evt.querySelector(descriptionCSS)?.textContent;
      // If there are other <p> tags with different classes, fetch them here

      // return title, imageurl, location, details
      return { title, imageUrl, location, details };
    });
  });

  await browser.close();
  return eventData;
};

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
