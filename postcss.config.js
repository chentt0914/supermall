module.exports = {
  plugins: {
    autoprefixer: {
      "postcss-px-to-viewport": {
        viewportWidth: 375,
        viewportHight: 667,
        unitPrecision: 5,
        viewportUnit: 'vw',
        selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
        minPixelValue: 1,
        mediaQuery: false
      }
    }
  }
}
