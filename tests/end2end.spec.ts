import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://127.0.0.1:5173/');

  })
  
test('I search for a DOI, bookmark a paper, and look for it in bookmarks', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //search
    await page.getByLabel('searchbar').click();
    await page.getByLabel("searchbar").fill("10.1016/j.toxrep.2019.06.021");
    await page.getByLabel("search-button").click();

    //Search results
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('heading').first()).toContainText('Recommended Papers');

    //Bookmark and nav to bookmarks
    await page.getByLabel('bookmark-button').first().click();
    await page.getByLabel('bookmarks').click();

    //Check bookmarks
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('heading').first()).toContainText('Bookmarks');

    await expect(page.getByLabel("paper-item").first()).toBeVisible();
    
});

test('I search for a DOI, bookmark a paper, and remove it from bookmarks', async ({ page }) => {
    await expect(page.getByLabel('searchbar')).toBeVisible();
    //search
    await page.getByLabel('searchbar').click();
    await page.getByLabel("searchbar").fill("10.1016/j.toxrep.2019.06.021");
    await page.getByLabel("search-button").click();

    //Search results
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('heading').first()).toContainText('Recommended Papers');

    //Bookmark and nav to bookmarks
    await page.getByLabel('bookmark-button').first().click();
    await page.getByLabel('bookmarks').click();

    //Check bookmarks
    await expect(page.getByLabel('searchbar')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('heading').first()).toContainText('Bookmarks');

    await expect(page.getByLabel("paper-item").first()).toBeVisible();
    await page.getByText('remove bookmark').first().click();

    
});




