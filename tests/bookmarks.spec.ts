import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://127.0.0.1:5173/');    
  })

 /*
 * test bookmark functionalities
 */
test('I bookmark a page of interest', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //fill search
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("test");
    await page.getByLabel("search-button").click();

    //get search results and bookmark
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await page.locator('.ml-4').first().click();

    //Bookmarks page
    await page.getByRole('link', { name: 'Bookmarks' }).click();

    await expect(page.getByLabel('searchbar')).toBeVisible();
    await page.locator('.card').click();
    
    //Verify correct result is bookmarked
    await expect(page.getByRole('heading').first()).toContainText('Visualization');
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');


})

test('I bookmark then unbookmark a page', async ({page}) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //fill search
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("test");
    await page.getByLabel("search-button").click();

    //get search results and bookmark
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await page.locator('.ml-4').first().click();

    //Bookmarks page
    await page.getByRole('link', { name: 'Bookmarks' }).click();

    await expect(page.getByLabel('searchbar')).toBeVisible();
    await page.locator('.card').click();
    
    //Verify correct result is bookmarked
    await expect(page.getByRole('heading').first()).toContainText('Visualization');
    await expect(page.getByLabel('searchbar')).not.toContainText('10.3389/fmicb.2023.1137083');

    //Go back to bookmarks
    await page.getByLabel("back-button").click();
    await expect(page.getByLabel('searchbar')).toBeVisible();

    //Remove bookmark
    await page.getByText('remove bookmark').first().click();
    await expect(page.locator('.MuiGrid-container')).toHaveCount(0);

});

test('I bookmark multiple pages', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //fill search
    await page.getByLabel("searchbar").click();
    await page.getByLabel("searchbar").fill("test");
    await page.getByLabel("search-button").click();

    //get search results and bookmark all results
    await expect(page.getByLabel('searchbar')).toBeVisible();
    for (const card of await page.locator('.ml-4').all()) {
        await card.click();
    }
        
    //Bookmarks page
    await page.getByRole('link', { name: 'Bookmarks' }).click();
    await expect(page.getByLabel('searchbar')).toBeVisible();

    //Check that all pages have been bookmarked
    await expect(page.locator('.MuiGrid-container')).toHaveCount(16);

})


