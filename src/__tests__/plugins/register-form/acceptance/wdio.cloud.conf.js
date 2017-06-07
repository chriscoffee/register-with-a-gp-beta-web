/* eslint-disable no-param-reassign */

const config = require('./config');
const wdioConfig = require('./wdio.conf.js').config;

const project = 'nhsuk';
const build = 'nhsuk [23]';
const maxInstances = 1;
const seleniumVersion = '3.0.1';
const safariDriver = '2.48';

exports.config = (function headlessConfig(globalConfig) {
  globalConfig.user = config.browserstack.user;
  globalConfig.key = config.browserstack.key;

  globalConfig.maxInstances = 2;

  globalConfig.host = 'hub.browserstack.com';
  globalConfig.port = 80;

  globalConfig.capabilities = [{
    browserName: 'chrome',
    os: 'WINDOWS',
    os_version: '8.1',
    project,
    build,
    maxInstances,
    'browserstack.selenium_version': seleniumVersion,
  }];

  globalConfig.onPrepare = globalConfig.onComplete = globalConfig.afterTest = () => {};

  return globalConfig;
}(wdioConfig));
