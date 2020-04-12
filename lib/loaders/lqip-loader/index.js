const { getFileLoaderOptions } = require('../file-loader')

/**
 * Build options for the webpack lqip loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getLqipLoaderOptions = (moduleConfig) => ({
  ...getFileLoaderOptions(moduleConfig),
  ...(moduleConfig.lqip || {})
})

module.exports = {
  getLqipLoaderOptions
}
