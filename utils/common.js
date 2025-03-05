const {expect } = require('@playwright/test');

class common
{
    /* 
    Func to number count from a given string 
    @param {String} str  
    */ 
    async getCountFromString(str)
    {
    const match = str.match(/\d+/);
    const count = match ? parseInt(match[0], 10) : 0;
    console.log("Count: " + count)
    return count;
    }

    /* 
    Func to assert the text of each item from list with given match string
    @param {Locator} locator, {String} str  
    */ 
    async assertTextMatchesListItems(locator, searchText)
    {
        const itemCount = await locator.count();
        // Iterate through the list items
        for (let i = 0; i < itemCount; i++) {
          const itemText = await locator.nth(i).innerText();
          console.log("List item text :" +itemText)
          const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitivity
          expect(itemText).toMatch(regex);
        }
    }
}
module.exports = { common }