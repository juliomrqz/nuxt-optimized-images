const chalk = require('chalk')
const consola = require('consola')

const prefix = `[${chalk.gray('nuxt-optimized-images')}]`

/**
 * Output a warning when images should get optimized (prod build) but no optimization
 * package is installed.
 */
const missingOptimizePackages = () => {
  let message = `${prefix} No package found which can optimize images.`
  message += `\nFor help during the setup and installation, please read ${chalk.underline('https://www.bazzite.com/docs/nuxt-optimized-images#optimization-packages')}`
  message += `\nIf this is on purpose and you don't want this plugin to optimize the images, set the option ${chalk.cyan('`optimizeImages: false`')} to hide this warning`

  consola.warn(message)
}

/**
 * Output a warning when images optimization is activated in dev mode
 */
const imageOptimizationInDevMode = () => {
  let message = `${prefix} Image Optimization is activated in development mode.`
  message += ` ${chalk.yellow('This could increase the build time')}.`

  consola.warn(message)
}

module.exports = {
  missingOptimizePackages,
  imageOptimizationInDevMode
}
