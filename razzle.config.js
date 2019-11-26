'use strict'

module.exports = {
  plugins: ["typescript"],
  modify: (config, { target, dev }, webpack) => {
    // stay immutable
    const newConfig = razzleHeroku(config, { target, dev}, webpack)

    return newConfig
  }
};
