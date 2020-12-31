const { getUrlLoaderOptions } = require('./loaders/url-loader')
const { getFileLoaderOptions } = require('./loaders/file-loader')
const { getLqipLoaderOptions } = require('./loaders/lqip-loader')
const { getResponsiveLoaderOptions } = require('./loaders/responsive-loader')
const { getSqipLoaderOptions } = require('./loaders/sqip-loader')

/**
 * Configure the common resource queries
 */
const queries = [
  // ?url: force a file url/reference, never use inlining
  {
    test: 'url',
    loaders: ['file-loader'],
    optimize: true,
    combinations: ['original'],
    options: { esModule: false }
  },

  // ?inline: force inlining an image regardless of the defined limit
  {
    test: 'inline',
    loaders: ['url-loader'],
    options: [
      {
        limit: undefined,
        esModule: false
      }
    ],
    optimize: true,
    combinations: ['original']
  },

  // ?include: include the image directly, no data uri or external file
  {
    test: 'include',
    loaders: [
      require.resolve('./loaders/raw-loader/export-loader.js'),
      'raw-loader'
    ],
    optimize: true,
    combinations: ['original']
  },

  // ?original: use the original image and don't optimize it
  {
    test: 'original',
    loaders: ['url-loader'],
    optimize: false
  },

  // ?lqip: low quality image placeholder
  {
    test: 'lqip(&|$)',
    loaders: [
      require.resolve('./loaders/lqip-loader/picture-export-loader.js'),
      'lqip-loader',
      'url-loader'
    ],
    optimize: false
  },

  // ?lqip: low quality image placeholder
  {
    test: 'lqip-colors',
    loaders: [
      require.resolve('./loaders/lqip-loader/colors-export-loader.js'),
      'lqip-loader',
      'url-loader'
    ],
    options: [
      {},
      {
        base64: false,
        palette: true
      }
    ],
    optimize: false
  },

  // ?resize: resize images
  {
    test: 'size',
    loaders: ['responsive-loader'],
    optimize: false
  },

  // ?sqip: low quality image placeholder
  {
    test: 'sqip(&|$)',
    loaders: [
      require.resolve('./loaders/sqip-loader/export-loader.js'),
      'sqip-loader',
      'url-loader'
    ],
    optimize: true
  }
];

/**
 * Add combinations
 */
[].concat(queries).forEach((queryConfig) => {
  if (queryConfig.combinations) {
    queryConfig.combinations.forEach((combination) => {
      if (combination === 'original') {
        queries.unshift({
          ...queryConfig,
          test: `(${queryConfig.test}.*original|original.*${queryConfig.test})`,
          optimize: false
        })
      }
    })
  }
})

/**
 * Returns all common resource queries for the given optimization loader
 *
 * @param {object} moduleConfig - @aceforth/nuxt-optimized-images configuration object
 * @param {string} optimizerLoaderName - name of the loader used to optimize the images
 * @param {object} optimizerLoaderOptions - config for the optimization loader
 * @returns {array}
 */
const getResourceQueries = (
  moduleConfig,
  optimizerLoaderName,
  optimizerLoaderOptions,
  detectLoaders
) => {
  const loaderOptions = {
    'url-loader': getUrlLoaderOptions(moduleConfig),
    'file-loader': getFileLoaderOptions(moduleConfig),
    'lqip-loader': getLqipLoaderOptions(moduleConfig),
    'responsive-loader': getResponsiveLoaderOptions(
      moduleConfig,
      detectLoaders
    ),
    'sqip-loader': getSqipLoaderOptions(moduleConfig, detectLoaders)
  }

  return queries.map((queryConfig) => {
    const loaders = []

    queryConfig.loaders.forEach((loader, index) => {
      const loaderConfig = {
        loader
      }

      if (loaderOptions[loader]) {
        loaderConfig.options = loaderOptions[loader]
      }

      if (queryConfig.options) {
        loaderConfig.options = {
          ...(loaderConfig.options || {}),
          ...(queryConfig.options[index] || {})
        }
      }

      loaders.push(loaderConfig)
    })

    return {
      resourceQuery: new RegExp(queryConfig.test),
      use: loaders.concat(
        queryConfig.optimize && optimizerLoaderName !== null
          ? [
              {
                loader: optimizerLoaderName,
                options: optimizerLoaderOptions
              }
            ]
          : []
      )
    }
  })
}

module.exports = {
  getResourceQueries
}
