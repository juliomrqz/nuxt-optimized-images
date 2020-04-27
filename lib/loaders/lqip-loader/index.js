const { getFileLoaderOptions } = require('../file-loader')

/**
 * Build options for the webpack lqip loader
 *
 * @param {object} moduleConfig - @mole-inc/nuxt-optimized-images configuration
 * @returns {object}
 */
const getLqipLoaderOptions = (moduleConfig) => ({
  ...getFileLoaderOptions(moduleConfig),
  ...(moduleConfig.lqip || {})
})

module.exports = {
  getLqipLoaderOptions
}
