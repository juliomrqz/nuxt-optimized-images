const path = require('path')
const { getFileLoaderOptions } = require('./file-loader')

/**
 * Build options for the webpack responsive loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @param {object} detectedLoaders - all detected and installed loaders
 * @returns {object}
 */
const getResponsiveLoaderOptions = ({
  responsive,
  ...moduleConfig
}, detectedLoaders) => {
  let adapter = responsive ? responsive.adapter : undefined

  if (!adapter && detectedLoaders.responsiveAdapter === 'sharp') {
    adapter = require(`${detectedLoaders.responsive}${path.sep}sharp`); // eslint-disable-line
  }

  let name

  if (moduleConfig.optimizeInCurrentState) {
    name = moduleConfig.responsiveImagesName(moduleConfig).replace('[hash:optimized]', '--[hash:7]')
  } else {
    name = moduleConfig.responsiveImagesName(moduleConfig).replace('[hash:optimized]', '')
  }

  return {
    ...getFileLoaderOptions(moduleConfig),
    name,
    ...(responsive || {}),
    adapter
  }
}

/**
 * Apply the responsive loader to the webpack configuration
 *
 * @param {object} webpackConfig - webpack configuration
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration
 * @param {object} detectedLoaders - all detected and installed loaders
 * @returns {object}
 */
const applyResponsiveLoader = (webpackConfig, moduleConfig, detectedLoaders) => {
  webpackConfig.module.rules.push({
    test: /\.(jpe?g|png|webp)$/i,
    oneOf: [
      {
        use: {
          loader: 'responsive-loader',
          options: getResponsiveLoaderOptions(moduleConfig, detectedLoaders)
        }
      }
    ]
  })
}

module.exports = {
  getResponsiveLoaderOptions,
  applyResponsiveLoader
}
