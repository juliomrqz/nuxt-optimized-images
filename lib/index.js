/**
 * Copyright (c) 2020, Julio Marquez
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { defaultConfig } = require('./config')
const {
  detectLoaders,
  getNumOptimizationLoadersInstalled,
  appendLoaders
} = require('./loaders')
const logger = require('./logger')

function nuxtOptimizedImages (moduleOptions) {
  const { dev } = this.options
  const options = Object.assign({}, defaultConfig, this.options.optimizedImages, moduleOptions)
  options.isDev = dev

  if (dev && options.optimizeImagesInDev) {
    logger.imageOptimizationInDevMode()
  }

  // detect all installed loaders
  const detectedLoaders = detectLoaders()
  logger.debug('Detected Loaders', detectedLoaders)

  // check if it should optimize images in the current state
  const optimizeInCurrentState = !dev || options.optimizeImagesInDev
  options.optimizeInCurrentState = optimizeInCurrentState

  // show a warning if images should get optimized but no loader is installed
  if (options.optimizeImages && getNumOptimizationLoadersInstalled(detectedLoaders) === 0 && optimizeInCurrentState) {
    logger.missingOptimizePackages()
  }

  this.extendBuild((config) => {
    const oldConfig = Object.assign({}, config)

    try {
      const testsRules = [
        // nuxt >= 2 & nuxt <= 2.3.4
        '/\\.(png|jpe?g|gif|svg|webp)$/',
        // nuxt >= 2.4.0
        '/\\.(png|jpe?g|gif|svg|webp)$/i',
        // nuxt >= 2.14.4
        '/\\.(png|jpe?g|gif|svg|webp|avif)$/i'
      ]

      testsRules.forEach(t => {
        const rule = config.module.rules.find(r => r.test && r.test.toString() === t)

        if (rule) {
          config.module.rules.splice(config.module.rules.indexOf(rule), 1)
        } else {
          logger.debug(`Test Rule couldn't be found: ${t}`)
        }
      })

      // append loaders
      config = appendLoaders(config, options, detectedLoaders, optimizeInCurrentState)
    } catch (error) {
      logger.error(error)
      config = oldConfig
    }

    return config
  })
}

module.exports = nuxtOptimizedImages
module.exports.meta = require('../package.json')
