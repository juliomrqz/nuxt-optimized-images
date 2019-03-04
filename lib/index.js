/**
 * Copyright (c) 2019, Bazzite, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const consola = require('consola')

const { defaultConfig } = require('./config')
const {
  detectLoaders,
  getNumOptimizationLoadersInstalled,
  appendLoaders
} = require('./loaders')
const {
  missingOptimizePackages,
  imageOptimizationInDevMode
} = require('./warning')

function nuxtOptimizedImages (moduleOptions) {
  const { dev } = this.options
  const options = Object.assign({}, defaultConfig, this.options.optimizedImages, moduleOptions)
  options.isDev = dev

  if (dev && options.optimizeImagesInDev) {
    imageOptimizationInDevMode()
  }

  // detect all installed loaders
  const detectedLoaders = detectLoaders()
  consola.debug('Detected Loaders', detectedLoaders)

  // check if it should optimize images in the current state
  const optimizeInCurrentState = !dev || options.optimizeImagesInDev
  options.optimizeInCurrentState = optimizeInCurrentState

  // show a warning if images should get optimized but no loader is installed
  if (options.optimizeImages && getNumOptimizationLoadersInstalled(detectedLoaders) === 0 && optimizeInCurrentState) {
    missingOptimizePackages()
  }

  this.extendBuild((config) => {
    const testsRules = [
      // nuxt >= 2 & nuxt <= 2.3.4
      '/\\.(png|jpe?g|gif|svg|webp)$/',
      // nuxt >= 2.4.0
      '/\\.(png|jpe?g|gif|svg|webp)$/i'
    ]

    testsRules.forEach(t => {
      const rule = config.module.rules.find(r => r.test.toString() === t)

      if (rule) {
        config.module.rules.splice(config.module.rules.indexOf(rule), 1)
      } else {
        consola.debug(`Test Rule couldn't be found: ${t}`)
      }
    })

    // append loaders
    return appendLoaders(config, options, detectedLoaders, optimizeInCurrentState)
  })
}

module.exports = nuxtOptimizedImages
module.exports.meta = require('../package.json')
