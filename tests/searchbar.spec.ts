import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://127.0.0.1:5173/');    
  })


 /*
 * test searchbar component functionalities
 */
test('I use the searchbar and input an incorrect DOI', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //fill search
    await page.getByLabel("searchbar").click();
    // await page.getByLabel("searchbar").fill("10.3389/fmicb.2023.1137083");
    await page.getByLabel("searchbar").fill("bad_response");
    await page.getByLabel("search-button").click();

    //check if error message appeared
    await page.getByText('DOI was not recognized in the').click();
    await expect(page.getByRole('paragraph').first()).toContainText("DOI was not recognized");

})

test('I successfully input a correct DOI into the searchbar', async ({page}) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //Input DOI
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("10.3389/fmicb.2023.1137083");
    await page.keyboard.press('Enter');

    //Check results page
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await page.locator('.card').first().click();
    await expect(page.getByRole('heading').first()).toContainText('Current');
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');

});

test('I use the search button or press enter', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //Use enter key
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("test");
    await page.keyboard.press('Enter');

    await page.locator('.card').first().click();
    await expect(page.getByRole('heading').first()).toContainText('Visualization');
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');

    // go back to start page
    await page.getByLabel("back-button").click();
    await expect(page.getByLabel('searchbar')).toBeVisible();

    //Use search key
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("10.3389/fped.2022.897333");
    await page.getByLabel('search-button').click();

    await expect(page.getByLabel('10paper')).toBeVisible();
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');
})


