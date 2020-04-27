const path = require('upath')

const {
  isModuleInstalled,
  detectLoaders,
  getHandledImageTypes,
  getNumOptimizationLoadersInstalled
  // appendLoaders
} = require('../../lib/loaders')
const { defaultConfig } = require('../../lib/config')

module.exports = () => () => ({ plugin: true })

describe('@mole-inc/nuxt-optimized-images/loaders', () => {
  it('detects if a module is installed', () => {
    expect(isModuleInstalled('path')).toEqual(true)
    expect(isModuleInstalled('pathalksdfjladksfj')).toEqual(false)
    expect(isModuleInstalled('img-loader.test.js')).toEqual(false)
  })

  it('detects installed loaders', () => {
    expect(detectLoaders()).toEqual({
      jpeg: '@mole-inc/imagemin-mozjpeg',
      gif: 'imagemin-gifsicle',
      svg: 'imagemin-svgo',
      webp: '@mole-inc/webp-loader',
      png: '@mole-inc/imagemin-pngquant',
      lqip: '@mole-inc/lqip-loader',
      sqip: 'sqip-loader',
      responsive: path.resolve(__dirname, '../../node_modules/responsive-loader'),
      responsiveAdapter: 'sharp'
    })
  })

  it('returns the handled image types', () => {
    const config1 = Object.assign({}, defaultConfig)
    expect(getHandledImageTypes(config1)).toEqual({
      jpeg: true,
      png: true,
      svg: true,
      webp: true,
      gif: true
    })

    const config2 = Object.assign(defaultConfig, { handleImages: ['jpg', 'png'] })
    expect(getHandledImageTypes(config2)).toEqual({
      jpeg: true,
      png: true,
      svg: false,
      webp: false,
      gif: false
    })

    const config3 = Object.assign(defaultConfig, { handleImages: [] })
    expect(getHandledImageTypes(config3)).toEqual({
      jpeg: false,
      png: false,
      svg: false,
      webp: false,
      gif: false
    })
  })

  it('counts the number of optimization loaders', () => {
    expect(getNumOptimizationLoadersInstalled({
      jpeg: 'imagemin-jpeg',
      png: 'imagemin-png'
    })).toEqual(2)
  })

  // TODO: check this
  // it('appends loaders to the webpack config', () => {
  //   const webpackConfig = { module: { rules: [] } }
  //   const config = Object.assign({}, defaultConfig)

  //   appendLoaders(webpackConfig, config, {
  //     jpeg: __filename,
  //     webp: __filename
  //   }, false)

  //   expect(webpackConfig.module.rules).toHaveLength(2)
  // })
})
