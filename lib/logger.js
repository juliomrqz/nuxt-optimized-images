const consola = require('consola')
const logger = consola.withScope('nuxt:@aceforth/nuxt-optimized-images')

/**
 * Output a warning when images should get optimized (prod build) but no optimization
 * package is installed.
 */
logger.missingOptimizePackages = () => {
  let message = 'No package found which can optimize images.'
  message += '\nFor help during the setup and installation, please read `https://marquez.co/docs/nuxt-optimized-images#optimization-packages`'
  message += '\nIf this is on purpose and you don\'t want this plugin to optimize the images, set the option `optimizeImages: false` to hide this warning.'

  logger.warn(message)
}

/**
 * Output a warning when images optimization is activated in dev mode
 */
logger.imageOptimizationInDevMode = () => {
  logger.warn('Image Optimization is activated in development mode.\n`This could increase the build time`.')
}

module.exports = logger
