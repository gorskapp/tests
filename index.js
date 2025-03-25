import puppeteer from 'puppeteer';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');

const codes = ['RABAT10', 'RABAT20', 'DISCOUNT50', 'PROMO25', 'SALE30', 'BONUS15', 'SHOP5', 'EXTRA40', 'WELCOME2024', 'VIPDEAL'];

async  function main() {
    const browser = await puppeteer.launch(); // removed headless used for testing purposes
    const page = await browser.newPage();
    const legitCodes = [];

    for (const code of codes) {
        await page.goto('https://dev-shop-integration.alerabat.com/');
        await page.locator('input').fill(code); // used input as selecter because it's just one - otherwise it could be id
        await page.locator('button').click(); // same as above - navigation is using <a> so no other buttons
        try {
            await page.waitForSelector('.text-green-600', {
                timeout: 1000,
            });
            legitCodes.push(code);
        } catch (error) {
        }
    }
    fs.writeFileSync('valid_codes.txt', legitCodes.join(", ")); // added comas so it's readable
    await browser.close();
};

main();
