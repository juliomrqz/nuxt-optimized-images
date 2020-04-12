/**
 * Enriches the @aceforth/nuxt-optimized-images configuration object with default config values for
 * next-optimized-iamges and returns it
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration object
 * @returns {object} enriched config
 */
const defaultConfig = {
  optimizeImages: true,
  optimizeImagesInDev: false,
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  imagesName: ({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]',
  responsiveImagesName: ({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]',
  inlineImageLimit: 1000,
  defaultImageLoader: 'img-loader',
  mozjpeg: {},
  optipng: {},
  pngquant: {},
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {},
  webp: {},
  sqip: {}
}

module.exports = {
  defaultConfig
}
