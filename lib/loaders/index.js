const { applyImgLoader } = require('./img-loader')
const { applyWebpLoader } = require('./webp-loader')
const { applyResponsiveLoader } = require('./responsive-loader')

/**
 * Checks if a node module is installed in the current context
 *
 * @param {string} name - module name
 * @returns {boolean}
 */
const isModuleInstalled = (name) => {
  try {
    require.resolve(name)

    return true
  } catch (e) {
    return false
  }
}

/**
 * Detects all currently installed image optimization loaders
 *
 * @returns {object}
 */
const detectLoaders = () => {
  const jpeg = isModuleInstalled('@mole-inc/imagemin-mozjpeg') ? '@mole-inc/imagemin-mozjpeg' : false
  const gif = isModuleInstalled('imagemin-gifsicle') ? 'imagemin-gifsicle' : false
  const svg = isModuleInstalled('imagemin-svgo') ? 'imagemin-svgo' : false
  const webp = isModuleInstalled('@mole-inc/webp-loader') ? '@mole-inc/webp-loader' : false
  const lqip = isModuleInstalled('@mole-inc/lqip-loader') ? '@mole-inc/lqip-loader' : false
  const sqip = isModuleInstalled('sqip-loader') ? 'sqip-loader' : false

  let png = false
  let responsive = false
  let responsiveAdapter = false

  if (isModuleInstalled('@mole-inc/imagemin-pngquant')) {
    png = '@mole-inc/imagemin-pngquant'
  } else if (isModuleInstalled('@mole-inc/imagemin-optipng')) {
    png = '@mole-inc/imagemin-optipng'
  }

  if (isModuleInstalled('responsive-loader')) {
    responsive = require.resolve('responsive-loader').replace(/(\/|\\)lib(\/|\\)index.js$/g, '')

    if (isModuleInstalled('sharp')) {
      responsiveAdapter = 'sharp'
    } else if (isModuleInstalled('jimp')) {
      responsiveAdapter = 'jimp'
    }
  }

  return {
    jpeg,
    gif,
    svg,
    webp,
    png,
    lqip,
    sqip,
    responsive,
    responsiveAdapter
  }
}

/**
 * Checks which image types should by handled by this plugin
 *
 * @param {object} moduleConfig - @mole-inc/nuxt-optimized-images configuration object
 * @returns {object}
 */
const getHandledImageTypes = (moduleConfig) => {
  const { handleImages } = moduleConfig

  return {
    jpeg: handleImages.indexOf('jpeg') >= 0 || handleImages.indexOf('jpg') >= 0,
    png: handleImages.indexOf('png') >= 0,
    svg: handleImages.indexOf('svg') >= 0,
    webp: handleImages.indexOf('webp') >= 0,
    gif: handleImages.indexOf('gif') >= 0
  }
}

/**
 * Returns the number of image optimization loaders installed
 *
 * @param {object} loaders - detected loaders
 * @returns {number}
 */
const getNumOptimizationLoadersInstalled = loaders => Object.values(loaders)
  .filter(loader => loader && (
    loader.startsWith('imagemin-') ||
    loader.startsWith('@mole-inc/imagemin-') ||
    loader.startsWith('@mole-inc/webp-') ||
    loader.startsWith('@mole-inc/lqip-')
  )).length

/**
 * Appends all loaders to the webpack configuration
 *
 * @param {object} webpackConfig - webpack configuration
 * @param {object} moduleConfig - @mole-inc/nuxt-optimized-images configuration
 * @param {object} detectedLoaders - detected loaders
 * @param {boolean} optimize - if images should get optimized or just copied
 * @returns {object}
 */
const appendLoaders = (
  webpackConfig,
  moduleConfig,
  detectedLoaders,
  optimize
) => {
  let config = webpackConfig
  const handledImageTypes = getHandledImageTypes(moduleConfig)
  let imgLoaderHandledTypes = handledImageTypes

  // check if responsive-loader should be the default loader and apply it if so
  if (moduleConfig.defaultImageLoader && moduleConfig.defaultImageLoader === 'responsive-loader') {
    // img-loader no longer has to handle jpeg and png images
    imgLoaderHandledTypes = { ...imgLoaderHandledTypes, jpeg: false, png: false }

    config = applyResponsiveLoader(webpackConfig, moduleConfig, detectLoaders)
  }

  // apply img loader
  const shouldApplyImgLoader = imgLoaderHandledTypes.jpeg || imgLoaderHandledTypes.png ||
    imgLoaderHandledTypes.gif || imgLoaderHandledTypes.svg

  if ((detectedLoaders.jpeg || detectedLoaders.png || detectedLoaders.gif || detectedLoaders.svg) &&
    shouldApplyImgLoader) {
    config = applyImgLoader(webpackConfig, moduleConfig, optimize,
      detectedLoaders, imgLoaderHandledTypes)
  } else if (shouldApplyImgLoader) {
    config = applyImgLoader(webpackConfig, moduleConfig, false,
      detectedLoaders, imgLoaderHandledTypes)
  }

  // apply webp loader
  if (detectedLoaders.webp && handledImageTypes.webp) {
    config = applyWebpLoader(webpackConfig, moduleConfig, optimize, detectLoaders)
  } else if (handledImageTypes.webp) {
    config = applyWebpLoader(webpackConfig, moduleConfig, false, detectLoaders)
  }

  return config
}

module.exports = {
  isModuleInstalled,
  detectLoaders,
  getHandledImageTypes,
  getNumOptimizationLoadersInstalled,
  appendLoaders
}
