import { test, expect } from '@playwright/test';

//Random string generator adapted from https://www.programiz.com/javascript/examples/generate-random-strings
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

test.beforeEach(async({page}) => {
    await page.goto('http://127.0.0.1:5173/');

  })

test('I input random string requests to the backend server', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();

    //Select and fill searchbar 
    for (let i = 0; i < 100; i ++) {
        await page.getByLabel("searchbar").click();
        let query = generateString(100);
        await page.getByLabel("searchbar").fill(query);
        await page.getByLabel("search-button").click();
        await page.getByLabel("searchbar").fill('');

    }
});
