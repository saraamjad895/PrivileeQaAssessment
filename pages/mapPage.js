const { common } = require("../utils/common");
const {expect } = require('@playwright/test');
const commonInstance = new common();

class MapPage {

  constructor(page) {
    this.page = page;
    this.venueCard = '.venue-card';
    this.filterLocator = page.locator('.sc-445d4fd4-5');
    this.showButtonLocator = page.locator('.sc-5180758e-9.jygJwH');
    this.mainPageCountLocator = page.locator('.sc-445d4fd4-1.bbFeEY'); 
    this.searchBarLocator = page.locator('.sc-c744ec56-5.dKOkWb');
    this.searchResultList = page.locator('.sc-a1efdac9-1.kHWhtf');
    this.brandNamePopup = page.locator('.sc-80f121f-2.kvdDpe');
    this.closeButton = page.getByTitle('Close modal window');
    this.getMapLocationBoxLocator = page.locator('.sc-c5e69dbe-3.cNOYVy.title');
    this.annualMemberToggleLocator = page.locator('.sc-445d4fd4-7.ecOrNM');
    this.unlockImageLocator = page.locator('.sc-cecf1bc5-0.cHylbc');
    this.selectedTabLocator = page.locator('button[selected][class="sc-d2d8fc08-2 eXrhOI"]');
    this.clearFilterLocator = page.locator('.sc-5180758e-3.ia-DkEi');
    this.closeFilterLocator = page.locator('button[title="Close modal window"]');
    this.noSearchResultLocator = page.locator('.sc-a1efdac9-8.SWKWR');
  }

  /* 
  Func to open the URL
  */
  async navigate() {
    await this.page.goto('https://staging-website.privilee.ae/map', { waitUntil: 'networkidle' });
  }

  /* 
  Func to click on filter button on map page
  */  
  async clickOnFilter() {
    await this.filterLocator.waitFor();
    await this.filterLocator.click();
  }

  /* 
  Func to select the location on filter
  @param {String} locationText  
  */  
  async selectByLocation(locationText) {
    const locationLocator = this.page.locator(`text="${locationText}"`);
    await locationLocator.waitFor( ); 
    await locationLocator.first().click();
  }

  /* 
  Func to click on show button on filter screen
  */  
  async clickShowButton() {
    await this.showButtonLocator.waitFor();
    await this.showButtonLocator.click();
  }

  /* 
  Func to get the show filter button count
  */  
  async getShowButtonCount() {
    await this.showButtonLocator.waitFor();
    const buttonText = await this.showButtonLocator.innerText();
    const showCount = commonInstance.getCountFromString(buttonText);
    return showCount;
  }

  /* 
  Func to get count on main screen
  */  
  async getMainPageCount() {
    await this.mainPageCountLocator.waitFor({ state: 'visible', timeout: 5000 });
    const countText = await this.mainPageCountLocator.innerText();
    const mainPageCount = commonInstance.getCountFromString(countText);
    return mainPageCount;
  }

  /* 
  Func to click on the search bar and sen keys to search data
  @param {String} searchText 
  */ 
  async clickOnSearchBarAndEnterKeys(searchText) {
    await this.searchBarLocator.waitFor();
    await this.searchBarLocator.click();
    await this.searchBarLocator.fill(searchText);
  }

  /* 
  Func to assert that each searched item in list is containing the earch key
  @param {String} searchText 
  */ 
  async assertSearchTextMatchesResultData(searchText) {
    await this.searchResultList.waitFor();
    await commonInstance.assertTextMatchesListItems(this.searchResultList, searchText);
  }

  /* 
  Func to select option tab by name
  @param {String} option 
  */ 
  async selectOptionButton(option)
  {
    const locationLocator = this.page.locator(`text="${option}"`);
    await locationLocator.first().waitFor(); 
    await locationLocator.first().click();
  }

  /* 
  Func to click on the barnd/venue by brand name
  @param {String} brandName 
  */ 
  async clickBrandChain(brandName)
  {
    await this.page.getByAltText(brandName).first().click();
  }

  /* 
  Func to get venue name from pop up
  */ 
  async getBrandNameFromPopUP()
  {
    await this.brandNamePopup.waitFor(); 
    return  await this.brandNamePopup.innerText();
  }

  /* 
  Func to click on close icon on venue detail page
  */ 
  async closeBrandDetailPage()
  {
    await closeButton.click();
  }

  /* 
  Func to get location name on map 
  */ 
  async getMapLocationBoxTitle()
  {
    await this.getMapLocationBoxLocator.waitFor(); 
    return  await this.getMapLocationBoxLocator.innerText();
  }

  /* 
  Func to calculate the page render time
  */ 
  async pageLoadTime()
  {
    const performance = await this.page.evaluate(() => {
      const timing = performance.timing;
      return {
        navigationStart: timing.navigationStart,
        loadEventEnd: timing.loadEventEnd,
        loadTime: timing.loadEventEnd - timing.navigationStart,
      };
    });
    console.log('Load Time:', performance.loadTime, 'ms');
    return performance.loadTime;
  }

  /* 
  Func to click on toggle of annual member only on waterparks page
  */ 
  async clickOnAnnualMemberToggle() {
    await this.annualMemberToggleLocator.waitFor();
    await this.annualMemberToggleLocator.click();
  }

  /* 
  Func to check the lock icon not available when click on toggle
  */ 
  async expectUnlockImageToBeVisible()
  {
    await expect(this.unlockImageLocator).not.toBeVisible();
  }

  /* 
  Func to get selected option name 
  */ 
  async getSelectedTabName()
  {
    await this.selectedTabLocator.waitFor(); 
    return  await this.selectedTabLocator.innerText();
  }

  /* 
  Func to check the clear filter button visibility
  */ 
  async expectClearFilterNotToBeVisible()
  {
    await expect(this.clearFilterLocator).not.toBeVisible();
  }

  /* 
  Func to check the click close button on filter screen
  */ 
  async clickCloseFilterButton() {
    await this.closeFilterLocator.first().waitFor();
    await this.closeFilterLocator.first().click();
  }

  /* 
  Func to text of no result found
  */ 
  async getSearchNoResultText()
  {
    await this.noSearchResultLocator.waitFor();
    return await this.noSearchResultLocator.innerText();
  }

}

module.exports = { MapPage }