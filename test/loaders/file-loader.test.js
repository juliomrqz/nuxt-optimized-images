const { defaultConfig } = require('../../lib/config')
const { getFileLoaderOptions } = require('../../lib/loaders/file-loader')

describe('@mole-inc/nuxt-optimized-images/loaders/file-loader', () => {
  it('uses the default config', () => {
    const optionsDev = getFileLoaderOptions(Object.assign({ isDev: true, optimizeImagesInDev: false }, defaultConfig))
    const optionsProd = getFileLoaderOptions(Object.assign({ isDev: false, optimizeImagesInDev: false }, defaultConfig))

    const optionsOptimizedDev = getFileLoaderOptions(Object.assign({ isDev: true, optimizeInCurrentState: true, optimizeImagesInDev: false }, defaultConfig))
    const optionsOptimizedProd = getFileLoaderOptions(Object.assign({ isDev: false, optimizeInCurrentState: true, optimizeImagesInDev: false }, defaultConfig))

    expect(optionsDev.name).toEqual('[path][name].[ext]')
    expect(optionsProd.name).toEqual('img/[contenthash:7].[ext]')

    expect(optionsOptimizedDev.name).toEqual('[path][name]--[hash:7].[ext]')
    expect(optionsOptimizedProd.name).toEqual('img/[contenthash:7].[ext]')
  })
})
