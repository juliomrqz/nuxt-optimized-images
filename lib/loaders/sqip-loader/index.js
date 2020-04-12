const { getFileLoaderOptions } = require('../file-loader')

/**
 * Build options for the webpack sqip loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getSqipLoaderOptions = (moduleConfig) => ({
  ...getFileLoaderOptions(moduleConfig),
  ...(moduleConfig.sqip || {})
})

module.exports = {
  getSqipLoaderOptions
}
