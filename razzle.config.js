// razzle.config.js -- i.e., WebPack overrides
// Inject / Override Webpack Configuration
// Two ways to use:
//  (1)  include a plugin:  e.g., plugin: ['typescript']; or
//  (2)  modify the webpack props directly in the newConfig object

'use strict'

// tslint:disable:no-var-requires
const razzleHeroku = require('razzle-heroku')

module.exports = {
  plugins: ["typescript"],
  modify: (config, { target, dev }, webpack) => {
    // stay immutable
    let newConfig = config
    // apply heroku deployment config
    newConfig = razzleHeroku(config, { target, dev}, webpack)
    // return new configuration
    return newConfig
  }
};
