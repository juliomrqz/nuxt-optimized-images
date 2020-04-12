/**
 * Build options for the webpack file loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getFileLoaderOptions = (moduleConfig) => {
  let name

  if (moduleConfig.optimizeInCurrentState) {
    name = moduleConfig.imagesName(moduleConfig).replace('[hash:optimized]', '--[hash:7]')
  } else {
    name = moduleConfig.imagesName(moduleConfig).replace('[hash:optimized]', '')
  }

  return {
    name
  }
}

module.exports = {
  getFileLoaderOptions
}
