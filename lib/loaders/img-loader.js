const { getResourceQueries } = require('../resource-queries')
const { getWebpResourceQuery } = require('./webp-loader')
const { getUrlLoaderOptions } = require('./url-loader')

/**
 * Requires an imagemin plugin and configures it
 *
 * @param {string} plugin - plugin name
 * @param {*} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @return {function}
 */
const requireImageminPlugin = (plugin, moduleConfig) => {
  let moduleName = plugin

  if (moduleConfig.overwriteImageLoaderPaths) {
    moduleName = require.resolve(plugin, { paths: [moduleConfig.overwriteImageLoaderPaths] })
  }

  /* eslint global-require: "off", import/no-dynamic-require: "off" */
  return require(moduleName)(moduleConfig[plugin.replace('imagemin-', '')] || {})
}

/**
 * Build options for the img loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @param {object} detectedLoaders - detected loaders
 * @param {boolean} optimize - if images should get optimized
 * @return {object}
 */
const getImgLoaderOptions = (moduleConfig, detectedLoaders, optimize) => {
  if (!optimize) {
    return {
      plugins: []
    }
  }

  return {
    plugins: [
      detectedLoaders.jpeg
        ? requireImageminPlugin(detectedLoaders.jpeg, moduleConfig)
        : undefined,

      detectedLoaders.png
        ? requireImageminPlugin(detectedLoaders.png, moduleConfig)
        : undefined,

      detectedLoaders.svg
        ? requireImageminPlugin(detectedLoaders.svg, moduleConfig)
        : undefined,

      detectedLoaders.gif
        ? requireImageminPlugin(detectedLoaders.gif, moduleConfig)
        : undefined
    ].filter(Boolean)
  }
}

/**
 * Build the regex for all handled image types
 *
 * @param {object} handledImageTypes - handled image types
 * @return {RegExp}
 */
const getHandledFilesRegex = (handledImageTypes) => {
  const handledFiles = [
    handledImageTypes.jpeg ? 'jpe?g' : null,
    handledImageTypes.png ? 'png' : null,
    handledImageTypes.svg ? 'svg' : null,
    handledImageTypes.gif ? 'gif' : null
  ]

  return new RegExp(`\\.(${handledFiles.filter(Boolean).join('|')})$`, 'i')
}

/**
 * Apply the img loader to the webpack configuration
 *
 * @param {object} webpackConfig - webpack configuration
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @param {boolean} optimize - if images should get optimized
 * @param {object} detectedLoaders - detected loaders
 * @param {object} handledImageTypes - detected image types
 * @returns {object}
 */
const applyImgLoader = (
  webpackConfig,
  moduleConfig,
  optimize,
  detectedLoaders,
  handledImageTypes
) => {
  const imgLoaderOptions = getImgLoaderOptions(moduleConfig, detectedLoaders, optimize)

  webpackConfig.module.rules.push({
    test: getHandledFilesRegex(handledImageTypes),
    oneOf: [
      // add all resource queries
      ...getResourceQueries(moduleConfig, optimize ? 'img-loader' : null, imgLoaderOptions, detectedLoaders),

      // ?webp: convert an image to webp
      handledImageTypes.webp
        ? getWebpResourceQuery(moduleConfig)
        : undefined,

      // default behavior: inline if below the definied limit, external file if above
      {
        use: [
          {
            loader: 'url-loader',
            options: getUrlLoaderOptions(moduleConfig)
          },
          {
            loader: 'img-loader',
            options: imgLoaderOptions
          }
        ]
      }
    ].filter(Boolean)
  })

  return webpackConfig
}

module.exports = {
  requireImageminPlugin,
  getImgLoaderOptions,
  getHandledFilesRegex,
  applyImgLoader
}
