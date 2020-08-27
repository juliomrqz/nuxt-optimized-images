const path = require('upath')
const cloneDeepWith = require('lodash.clonedeepwith')
const isString = require('lodash.isstring')

const nuxtOptimizedImages = require('../lib')
const nuxtMock = require('./nuxt.mock')

// Get relative path from current file
const relative = dir => {
  return path.relative(__dirname, dir)
}

// Convert absolute paths to relative
const convartPathsToRelative = (option) => {
  return cloneDeepWith(option, value => {
    if (isString(value) && path.isAbsolute(value)) {
      const relativePath = path.normalize(relative(value))

      if (relativePath.split('../').length <= 3) {
        return path.toUnix(path.normalize(relative(value)))
      }
    }
  })
}

describe('nuxt-optimized-images', () => {
  it('returns a mock nuxt.js config object', () => {
    const nuxtMockObject = nuxtMock()

    expect(typeof nuxtMockObject.init).toBe('function')
    expect(typeof nuxtMockObject.extendBuild).toBe('function')
    expect(typeof nuxtMockObject.options).toBe('object')
  })

  it('handles all images by default', () => {
    const nuxtMockObject = nuxtMock()
    const options = nuxtMockObject.init(nuxtOptimizedImages)

    expect(options.webPackConfig.module.rules).toHaveLength(3)

    const rule = options.webPackConfig.module.rules[0]
    const webpRule = options.webPackConfig.module.rules[1]

    expect(rule.test.test('.jpg')).toEqual(true)
    expect(rule.test.test('.jpeg')).toEqual(true)
    expect(rule.test.test('.png')).toEqual(true)
    expect(rule.test.test('.gif')).toEqual(true)
    expect(rule.test.test('.svg')).toEqual(true)
    expect(rule.test.test('.JPG')).toEqual(true)
    expect(rule.test.test('.JPEG')).toEqual(true)
    expect(rule.test.test('.PNG')).toEqual(true)
    expect(rule.test.test('.GIF')).toEqual(true)
    expect(rule.test.test('.SVG')).toEqual(true)
    expect(rule.test.test('.webp')).toEqual(false)
    expect(rule.test.test('.WEBP')).toEqual(false)
    expect(webpRule.test.test('.webp')).toEqual(true)
    expect(webpRule.test.test('.WEBP')).toEqual(true)

    expect(convartPathsToRelative(rule)).toMatchSnapshot()
    expect(convartPathsToRelative(webpRule)).toMatchSnapshot()
  })

  it('can disable image types', () => {
    const nuxtMockObject = nuxtMock(true, { handleImages: ['jpeg'] })
    const options = nuxtMockObject.init(nuxtOptimizedImages)

    expect(options.webPackConfig.module.rules).toHaveLength(2)

    const rule = options.webPackConfig.module.rules[0]

    expect(rule.test.test('.jpg')).toEqual(true)
    expect(rule.test.test('.jpeg')).toEqual(true)
    expect(rule.test.test('.png')).toEqual(false)
    expect(rule.test.test('.gif')).toEqual(false)
    expect(rule.test.test('.svg')).toEqual(false)
    expect(rule.test.test('.JPG')).toEqual(true)
    expect(rule.test.test('.JPEG')).toEqual(true)
    expect(rule.test.test('.PNG')).toEqual(false)
    expect(rule.test.test('.GIF')).toEqual(false)
    expect(rule.test.test('.SVG')).toEqual(false)
    expect(rule.test.test('.webp')).toEqual(false)
    expect(rule.test.test('.WEBP')).toEqual(false)

    expect(convartPathsToRelative(rule)).toMatchSnapshot()
  })

  it('can optimize all images on production', () => {
    const nuxtMockObject = nuxtMock(false)
    const options = nuxtMockObject.init(nuxtOptimizedImages)

    expect(options.webPackConfig.module.rules).toHaveLength(3)

    const rule = options.webPackConfig.module.rules[0]
    const webpRule = options.webPackConfig.module.rules[1]

    expect(convartPathsToRelative(rule)).toMatchSnapshot()
    expect(convartPathsToRelative(webpRule)).toMatchSnapshot()
  })
})
