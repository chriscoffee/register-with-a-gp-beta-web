const ContentPage = require('../pageobjects/practice.page');

describe('a content page', () => {
  it('should contain a local header', () => {
    ContentPage.open();
    ContentPage.header.isVisible().should.be.true;
  });
});
