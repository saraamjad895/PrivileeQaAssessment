const { test, expect } = require('@playwright/test');
const {MapPage} = require('../pages/mapPage.js');

let mapPage;

  test.beforeEach('Navigate to URL', async ({ page }) => {
    console.log("============= Navigating to Privilee =============");
    mapPage = new MapPage(page);
    await mapPage.navigate();
  });
  
  test('Verify filter by location displays correct count on filter button and main page', async ({ page }) => {
    console.log("============= Executing Test Case 1 =============");
    await mapPage.clickOnFilter();
    await mapPage.selectByLocation('Dubai');
    
    const showButtonCount = await mapPage.getShowButtonCount();
    await mapPage.clickShowButton();
    const mainPageCount = await mapPage.getMainPageCount();
    
    expect(showButtonCount).toBe(mainPageCount);
  });
  
  test('Verify search bar returns correct results', async ({ page }) => {
    console.log("============= Executing Test Case 2 =============");
    const searchText = 'hilton';
    await mapPage.clickOnSearchBarAndEnterKeys(searchText);
    await mapPage.assertSearchTextMatchesResultData(searchText);
  });
  
  test('Verify venue detail page opens correctly and map shows correct location', async ({ page }) => {
    console.log("============= Executing Test Case 3 =============");
    const venueName = 'Just Splash, Splash Park';
    
    await mapPage.selectOptionButton('Waterparks');
    await mapPage.clickBrandChain(venueName);
    
    const actualName = await mapPage.getBrandNameFromPopUP();
    expect(venueName).toBe(actualName);
  
    const mapLocationTitle = await mapPage.getMapLocationBoxTitle();
    expect(venueName).toBe(mapLocationTitle);
  });
  
  test('Verify page load time for selecting different types is within acceptable range', async ({ page }) => {
    console.log("============= Executing Test Case 4 =============");
    await mapPage.selectOptionButton('Fitness');
    const loadTime = await mapPage.pageLoadTime();
    expect(loadTime).toBeLessThan(20000);
  });
  
  test('Verify annual members toggle removes lock image from waterpark venues', async ({ page }) => {
    console.log("============= Executing Test Case 5 =============");
    await mapPage.selectOptionButton('Waterparks');
    await mapPage.clickOnAnnualMemberToggle();
    await mapPage.expectUnlockImageToBeVisible();
  });
  
  test('Verify that page refresh clears tab and filter selections', async ({ page }) => {
    console.log("============= Executing Test Case 6 =============");
    await mapPage.selectOptionButton('Family activities');
    await mapPage.clickOnFilter();
    await mapPage.selectByLocation('Fujairah');
    await mapPage.clickShowButton();
    
    await page.reload();
    const actualTabName = await mapPage.getSelectedTabName();
    expect(actualTabName).toBe('Pool & beach');
    
    await mapPage.clickOnFilter();
    await mapPage.expectClearFilterNotToBeVisible();
  });
  
  test('Verify that incorrect search returns no results', async ({ page }) => {
    console.log("============= Executing Test Case 7 =============");
    const searchText = 'invalid search';
    await mapPage.clickOnSearchBarAndEnterKeys(searchText);
    const actualText = await mapPage.getSearchNoResultText();
    expect(actualText).toBe('No Results Found');
  });
  
  test.afterEach('Close browser', async ({ page }) => {
    console.log("============= Closing Browser =============");
    await page.close();
  });