const { defaultConfig } = require('../../lib/config')
const {
  getWebpLoaderOptions,
  applyWebpLoader,
  getWebpResourceQuery
} = require('../../lib/loaders/webp-loader')

describe('@mole-inc/nuxt-optimized-images/loaders/webp-loader', () => {
  it('uses the default config', () => {
    const config = Object.assign({}, defaultConfig)
    const options = getWebpLoaderOptions(config)

    expect(options).toEqual({})
  })

  it('allows overwriting the default options', () => {
    const config = Object.assign(defaultConfig, { webp: { a: 1 } })
    const options = getWebpLoaderOptions(config)

    expect(options).toEqual({ a: 1 })
  })

  it('adds rules to the webpack config', () => {
    const webpackConfig = { module: { rules: [] } }
    const config = Object.assign({}, defaultConfig)
    applyWebpLoader(webpackConfig, config, true, false, {})

    const rule = webpackConfig.module.rules[0]

    expect(rule.test).toBeInstanceOf(RegExp)
    expect(rule.test.test('.webp')).toEqual(true)
    expect(rule.oneOf).toHaveLength(11)
  })

  it('generates a resource query for webp conversion', () => {
    const config = Object.assign({}, defaultConfig)
    const options = getWebpResourceQuery(config, false)

    expect(options.resourceQuery.test('img.jpg?webp')).toEqual(true)
    expect(options.use).toHaveLength(2)
    expect(options.use[0].loader).toEqual('url-loader')
    expect(options.use[1].loader).toEqual('@mole-inc/webp-loader')
  })
})
