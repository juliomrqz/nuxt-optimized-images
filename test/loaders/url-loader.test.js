const { defaultConfig } = require('../../lib/config')
const { getUrlLoaderOptions } = require('../../lib/loaders/url-loader')

describe('@mole-inc/nuxt-optimized-images/loaders/url-loader', () => {
  it('uses the default config', () => {
    const config = Object.assign({}, defaultConfig)
    const options = getUrlLoaderOptions(config)

    expect(options.limit).toEqual(1000)
    expect(options.fallback).toEqual('file-loader')
    expect(options.name).toEqual('img/[contenthash:7].[ext]')
  })

  it('allows overwriting the inlineImageLimit option', () => {
    const config = Object.assign(defaultConfig, { inlineImageLimit: 10 })
    const options = getUrlLoaderOptions(config)

    expect(options.limit).toEqual(10)
  })
})
