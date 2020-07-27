---
title: "Configuration"
description: "The default options for these optimizers should be enough in most cases, but you can overwrite every available option if you want to"
createdAt: "2019-03-01T13:35:06Z"
publishedAt: "2019-03-01T13:35:06Z"
updatedAt: "2020-07-15T16:46:04Z"
position: 3
category: "Getting started"
---

This module uses [img-loader](https://www.npmjs.com/package/img-loader) under the hood which is based on [mozjpeg][imagemin-mozjpeg], [optipng][imagemin-optipng], [gifsicle][imagemin-gifsicle] and [svgo][imagemin-svgo].

The default options for these optimizers should be enough in most cases, but you can overwrite every available option if you want to.

## handleImages

- Type: `string[]`
- Default: `['jpeg', 'png', 'svg', 'webp', 'gif']`

`@aceforth/nuxt-optimized-images` registers the webpack loader for all these file types.

If you don't want one of these handled by `@aceforth/nuxt-optimized-images` because you, for example, have another plugin or custom loader rule, simply remove it from the array.

Please note that an image being handled does not mean it also gets automatically optimized. The required optimization package for that image also has to be installed. Please read the [optimization packages](/docs/nuxt-optimized-images#optimization-packages) section for more information.

If an image gets handled but not optimized, it means that the original image will get used and copied for the build.

## inlineImageLimit

- Type: `number`
- Default: `1000`

Smaller files will get inlined with a `data-uri` by [url-loader](https://www.npmjs.com/package/url-loader).

This number defines the maximum file size (in bytes) for images to get inlined. If an image is bigger, it will get copied to the static folder of Nuxt.js. Images will get optimized in both cases.

To completely disable image inlining, set this value to `-1`. You will then always get back an image URL.

## imagesName

- Type: `function`
- Default: `({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]'`

The filename of the optimized images.

<docs-alert>

Make sure you keep the `[hash]` fragment so they receive a new filename if the content changes.

</docs-alert>

## responsiveImagesName

- Type: `function`
- Default: `({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]'`

The filename of the responsive images.

<docs-alert>

Make sure you keep the `[hash]` fragment so they receive a new filename if the content changes.

</docs-alert>

## optimizeImagesInDev

- Type: `boolean`
- Default: `false`

For faster development builds and HMR, images will not get optimized by default when running in development mode. **In production, images will always get optimized, regardless of this setting.**

## mozjpeg

<docs-alert>

Requires the optional optimization package [`imagemin-mozjpeg`][imagemin-mozjpeg]

</docs-alert>

- Type: `object`
- Default: `{}`

[mozjpeg][imagemin-mozjpeg] is used for optimizing JPEG images. You can specify the options for it here. **The default options of `mozjpeg` are used if you omit this option.**

## pngquant

<docs-alert>

Requires the optional optimization package [`imagemin-pngquant`][imagemin-pngquant]

</docs-alert>

- Type: `object`
- Default: `{}`

[pngquant][imagemin-pngquant] is used for optimizing PNG images by default. **The default options of `pngquant` are used if you omit this option.**

## optipng

<docs-alert>

Requires the optional optimization package [`imagemin-optipng`][imagemin-optipng]

</docs-alert>

- Type: `object`
- Default: `{}`

[optipng][imagemin-optipng] is an alternative way for optimizing PNG images. You can specify the options for it here. **The default options of `optipng` are used if you omit this option.**

## gifsicle

<docs-alert>

Requires the optional optimization package [`imagemin-gifsicle`][imagemin-gifsicle]

</docs-alert>

- Type: `object`
- Default:

```javascript
{
    interlaced: true,
    optimizationLevel: 3,
}
```

[gifsicle][imagemin-gifsicle] is used for optimizing GIF images. You can specify the options for it here. **The default options of `gifsicle` are used if you omit this option.**

## svgo

<docs-alert>

Requires the optional optimization package [`imagemin-svgo`][imagemin-svgo]

</docs-alert>

- Type: `object`
- Default: `{}`

[svgo][imagemin-svgo] is used for optimizing SVG images and icons. You can specify the options for it here. **The default options of `svgo` are used if you omit this option.**

Single svgo plugins can get disabled/enabled in the plugins array:

```javascript
{
  svgo: {
    plugins: [
      { removeComments: false }
    ]
  }
}
```

## webp

<docs-alert>

Requires the optional optimization package [`webp-loader`][webp-loader]

</docs-alert>

- Type: `object`
- Default: `{}`

[imagemin-webp][webp-loader] is used for optimizing WebP images and converting other formats to WebP. You can specify the options for it here. **The default options of `imagemin-webp` are used if you omit this option.**

## responsive

<docs-alert>

Requires the optional optimization package [`responsive-loader`][responsive-loader]

</docs-alert>

- Type: `object`
- Default: `{}`

The configuration for the [`responsive-loader`][responsive-loader] can be defined here.

## defaultImageLoader

<docs-alert>

Requires the optional optimization package `responsive-loader`

</docs-alert>

- Type: `string`
- Default: `'img-loader'`

By default, img-loader handles most of the requests.

<docs-alert variant="info">

If you use the `responsive-loader` a lot and don't want to add the [`?resize`](/docs/nuxt-optimized-images/usage#resize) query param to every require, you can set this value to `'responsive-loader'`.

After that, `responsive-loader` will handle *all* JPEG and PNG images per default, even without an additional query param. Just be aware that you can't use any of the [query params `@aceforth/nuxt-optimized-images`](/docs/nuxt-optimized-images/usage) provides anymore on these images because the request just gets forwarded and not modified anymore.

All other formats (SVG, WEBP and GIF) still work as before with the `img-loader` and so have all query params available.

</docs-alert>

## optimizeImages

- Type: `boolean`
- Default: `true`

If you don't want the images to be optimized, you can set this value to `false`.

<docs-alert>

If you don't have any optimization package installed and this option is set to `true`, no image will get optimized. In this case, a warning gets printed in the console during build to inform you about a possible misconfiguration.

</docs-alert>


[imagemin-mozjpeg]: https://www.npmjs.com/package/imagemin-mozjpeg
[imagemin-pngquant]: https://www.npmjs.com/package/imagemin-pngquant
[imagemin-optipng]: https://www.npmjs.com/package/imagemin-optipng
[imagemin-gifsicle]: https://www.npmjs.com/package/imagemin-gifsicle
[imagemin-svgo]: https://www.npmjs.com/package/imagemin-svgo
[webp-loader]: https://www.npmjs.com/package/webp-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
