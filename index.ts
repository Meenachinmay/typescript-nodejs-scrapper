import puppeteer, { Browser } from "puppeteer";

const url = 'https://www.okinawastory.jp/event/';

const main = async () => {
    const browser: Browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // You may need to wait for the elements to load
    await page.waitForSelector('.os-c-list-cmn');

    const eventData = await page.evaluate(() => {
        const eventArticles = Array.from(document.querySelectorAll('.os-c-list-cmn'));
        return eventArticles.map(evt => {
            const imageUrl = evt.querySelector('img')?.getAttribute('src');
            const title = evt.querySelector('.os-c-list-cmn__title-link')?.textContent;
            const location = evt.querySelector('.os-c-list-cmn__disc')?.textContent;
            const details = evt.querySelector('.os-c-list-cmn__lead.os-c-list-cmn-tile-event-lead')?.textContent;
            // If there are other <p> tags with different classes, fetch them here
    
            return { title, imageUrl, location, details };
        });
    });

    console.log(eventData);

    await browser.close();
};

main();
