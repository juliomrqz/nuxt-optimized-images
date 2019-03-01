module.exports = (isDev = true, moduleOptions = {}) => {
  const initialOptions = {
    dev: isDev,
    webPackConfig: {
      module: {
        rules: []
      }
    },
    optimizedImages: moduleOptions
  }

  return {
    options: initialOptions,
    extendBuild (method) {
      this.options.webPackConfig = method(this.options.webPackConfig)
    },
    init (theModule) {
      const nuxtOptimizedImages = theModule.bind(this)
      nuxtOptimizedImages(this.options.webPackConfig)

      return this.options
    }
  }
}
