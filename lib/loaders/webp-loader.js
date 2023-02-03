const { getUrlLoaderOptions } = require('./url-loader')
const { getResourceQueries } = require('../resource-queries')

/**
 * Build options for the webp loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getWebpLoaderOptions = ({ webp }) => webp || {}

/**
 * Apply the webp loader to the webpack configuration
 *
 * @param {object} webpackConfig - webpack configuration
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @param {boolean} optimize - if images should get optimized
 * @param {object} detectedLoaders - all detected and installed loaders
 * @returns {object}
 */
const applyWebpLoader = (webpackConfig, moduleConfig, optimize, detectLoaders) => {
  const webpLoaders = [
    {
      loader: 'url-loader',
      options: getUrlLoaderOptions(moduleConfig)
    }
  ]

  if (optimize) {
    webpLoaders.push({
      loader: 'webp-loader',
      options: getWebpLoaderOptions(moduleConfig)
    })
  }

  webpackConfig.module.rules.push({
    test: /\.webp$/i,
    oneOf: [
      // add all resource queries
      ...getResourceQueries(moduleConfig, !optimize ? null : 'webp-loader', getWebpLoaderOptions(moduleConfig), detectLoaders),

      // default behavior: inline if below the definied limit, external file if above
      {
        use: webpLoaders
      }
    ]
  })

  return webpackConfig
}

/**
 * Returns the resource query definition for converting a jpeg/png image to webp
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @returns {object}
 */
const getWebpResourceQuery = (moduleConfig) => {
  const urlLoaderOptions = getUrlLoaderOptions(moduleConfig)
  const imageName = urlLoaderOptions.name.indexOf('[ext]')
    ? urlLoaderOptions.name.replace('[ext]', 'webp')
    : `${urlLoaderOptions.name}.webp`

  return {
    resourceQuery: /webp/,
    use: [
      {
        loader: 'url-loader',
        options: Object.assign(
          {},
          urlLoaderOptions,
          {
            name: imageName,
            mimetype: 'image/webp'
          }
        )
      },
      {
        loader: 'webp-loader',
        options: getWebpLoaderOptions(moduleConfig)
      }
    ]
  }
}

module.exports = {
  getWebpLoaderOptions,
  applyWebpLoader,
  getWebpResourceQuery
}
