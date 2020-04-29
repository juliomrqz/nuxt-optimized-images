---
title: "Example"
description: "If the default values are good enough for your use-case, you don't have to specify them to have a shorter and cleaner `nuxt.config.js` file."
permalink: /example/
created: "2019-03-01T13:35:06.636Z"
published: "2019-03-01T13:35:06.636Z"
---

# Example

The options specified here are the **default** values. So if they are good enough for your use-case, you don't have to specify them to have a shorter and cleaner `nuxt.config.js` file.

```javascript
// nuxt.config.js
{
  optimizedImages: {
    inlineImageLimit: 1000,
    imagesName: ({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]',
    responsiveImagesName: ({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    svgo: {
      // enable/disable svgo plugins here
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  }
}
```
