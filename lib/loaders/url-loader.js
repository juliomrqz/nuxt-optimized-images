const { getFileLoaderOptions } = require('./file-loader')

/**
 * Build options for the webpack url loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getUrlLoaderOptions = ({
  inlineImageLimit,
  ...config
}) => ({
  ...getFileLoaderOptions(config),
  limit: inlineImageLimit,
  fallback: 'file-loader',
  esModule: false
})

module.exports = {
  getUrlLoaderOptions
}
