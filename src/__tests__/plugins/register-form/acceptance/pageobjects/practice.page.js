const page = require('./page');

const contentPage = Object.create(page, {
  /**
   * define elements
   */
  header: {
    get: () => {
      return browser.element('.local-header');
    },
  },
  h1: {
    get: () => {
      return browser.element('.local-header h1');
    },
  },

  /**
   * define or overwrite page methods
   */
  open: {
    value: function open() {
      page.open.call(this, '');
    },
  },
});

module.exports = contentPage;