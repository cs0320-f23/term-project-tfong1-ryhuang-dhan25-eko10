import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://127.0.0.1:5173/');

  })

  /*
 * test component functionalities
 */
test('I navigate to a new page and press the back button', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //click on bookmarks
    await page.getByLabel("bookmarks").click();

    // click on back button
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await expect(page.getByLabel('back-button')).toBeVisible();

    await page.getByLabel("back-button").click();
    
    // checking calls were registered + loaded
    // await expect(page.getByTestId("Item 0")).toContainText("Successfully registered command load");
    // await expect(page.getByTestId("Item 1")).toContainText("Successfully loaded data/ten-star.csv");

    // // call search
    // await page.getByLabel("Command input").click();
    // await page.getByLabel("Command input").fill("register search");
    // await page.getByRole("button").click();

    // await expect(page.getByTestId("Item 2")).toContainText("Successfully");

    // await page.getByLabel("Command input").click();
    // await page.getByLabel("Command input").fill("search 0");
    // await page.getByRole("button").click();

    // await expect(page.getByTestId('Table 3 row 0 entry 0')).toBeVisible();
    // await expect(page.getByTestId("Table 3 row 0 entry 0")).toContainText("0");
    // await page.getByLabel("Command input").click();
    // await page.getByLabel("Command input").fill("load dol_ri_earnings_disparity.csv");
    // await page.getByRole("button").click();
    // await page.getByLabel("Command input").click();
    // await page.getByLabel("Command input").fill("search White");
    // await page.getByRole("button").click();

    // await expect(page.getByTestId("Table 5 row 0 entry 4")).toContainText("$1.00");
})

test('I use the searchbar and input a DOI', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //fill search
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("10.3389/fmicb.2023.1137083");
    await page.getByLabel("search-button").click();

    //load next page
    await expect(page.getByLabel('0paper')).toBeVisible();
    await expect(page.getByLabel('1paper')).toBeVisible();
})


test('I use the search button or press enter', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //Use enter key
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("10.3389/fmicb.2023.1137083");
    await page.keyboard.press('Enter');

    await expect(page.getByLabel('0paper')).toBeVisible();
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');

    // go back to start page
    await page.getByLabel("back-button").click();
    await expect(page.getByLabel('searchbar')).toBeVisible();

    //Use search key
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("10.3389/fped.2022.897333");
    await page.getByLabel('search-button').click();

    await expect(page.getByLabel('0paper')).toBeVisible();
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');
})


