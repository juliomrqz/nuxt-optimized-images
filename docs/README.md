---
title: "Overview"
description: "Automatically optimizes images used in Nuxt.js projects (jpeg, png, svg, webp and gif)"
created: "2019-03-01T13:35:06Z"
published: "2019-03-01T13:35:06Z"
modified: "2020-07-15T16:46:04Z"
position: 1
category: "Getting started"
---

# Nuxt Optimized Images

Automatically optimizes images used in Nuxt.js projects (JPEG, PNG, SVG, WebP and GIF).

> This module is inspired by the work of [Cyril Wanner](https://github.com/cyrilwanner) in [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images).

## Features

Image sizes can often get reduced up to 60%, but this is not the only thing `@aceforth/nuxt-optimized-images` does:

* **Reduces image size** by optimizing images during build.
* Improves loading speed by providing **progressive images** (for formats that support it).
* **Inlines small images** to save HTTP requests and additional roundtrips.
* Adds a **content hash** to the file name so images can get cached on CDN level and in the browser for a long time (This is the default behavior of Nuxt.js).
* Same image URLs over multiple builds for long time caching.
* Provides **[query params](/docs/nuxt-optimized-images/usage#query-params)** for file-specific handling/settings.
* JPEG/PNG images can be **converted to [`WebP` on the fly](/docs/nuxt-optimized-images/usage#webp)** for an even smaller size.
* Can **[resize](/docs/nuxt-optimized-images/usage#resize)** images or generate **low-quality image placeholders** ([lqip](/docs/nuxt-optimized-images/usage#lqip)) and extract the dominant [colors](/docs/nuxt-optimized-images/usage#lqip-colors) of it.

## Installation

<docs-code-group>
  <docs-code-block label="Yarn" active>

  ```bash
  yarn add --dev @aceforth/nuxt-optimized-images
  ```

  </docs-code-block>
  <docs-code-block label="NPM">

  ```bash
  npm install --save-dev @aceforth/nuxt-optimized-images
  ```

  </docs-code-block>
</docs-code-group>

<docs-alert>

Node >= 10 and Nuxt.js >= 2 are required.

</docs-alert>


Add `@aceforth/nuxt-optimized-images` to `buildModules` section of nuxt.config.js:

<docs-alert>

If you are using Nuxt `< 2.9.0`, use `modules` instead. 

</docs-alert>

```js
{
  buildModules: [
    '@aceforth/nuxt-optimized-images',
  ],

  optimizedImages: {
    optimizeImages: true
  }
}
```

See the [configuration](/docs/nuxt-optimized-images/configuration) section for all available options.


<docs-alert variant="info">

Images won't get optimized out of the box. You have to install the optimization packages you really need in addition to this module.

This doesn't force you to download big optimization libraries you don't even use.
Please check out the table of all [optional optimization packages](#optimization-packages).

</docs-alert>

## Optimization Packages

You have to install the optimization packages you need in your project in addition to this module. Then, `@aceforth/nuxt-optimized-images` detects all the supported packages and uses them.

**So you only have to install these packages with npm, there is no additional step needed after that.**

The following optimization packages are available and supported:

| Optimization Package | Description                                                                                                                                                                                             | Project Link              |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `imagemin-mozjpeg`   | Optimizes JPEG images                                                                                                                                                                                   | [Link][imagemin-mozjpeg]  |
| `imagemin-pngquant`  | Optimizes PNG images                                                                                                                                                                                    | [Link][imagemin-pngquant] |
| `imagemin-optipng`   | Alternative for optimizing PNG images                                                                                                                                                                   | [Link][imagemin-optipng]  |
| `imagemin-gifsicle`  | Optimizes GIF images                                                                                                                                                                                    | [Link][imagemin-gifsicle] |
| `imagemin-svgo`      | Optimizes SVG images and icons                                                                                                                                                                          | [Link][imagemin-svgo]     |
| `webp-loader`        | Optimizes WebP images and can convert JPEG/PNG images to WebP on the fly ([WebP resource query](/docs/nuxt-optimized-images/usage#webp))                                                                                       | [Link][webp-loader]       |
| `lqip-loader`        | Generates low quality image placeholders and can extract the dominant colors of an image ([lqip resource query](/docs/nuxt-optimized-images/usage#lqip))                                                                       | [Link][lqip-loader]       |
| `responsive-loader`  | Can resize images on the fly and create multiple versions of it for a `srcSet`. **Important**: You need to additionally install either `jimp` (node implementation, slower) or `sharp` (binary, faster) | [Link][responsive-loader] |
| `sqip-loader`  | Loads images and exports tiny SQIP previews as `image/svg+xml` URL-encoded data | [Link][sqip-loader] |

Example: If you have JPG, PNG, and SVG images in your project, you would then need to run

```bash
npm install --save-dev imagemin-mozjpeg imagemin-pngquant imagemin-svgo

# or

yarn add --dev imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

To install **all** optional packages, run:

```bash
npm install --save-dev imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader sharp

# or

yarn add --dev imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader sharp
```

<docs-alert>

Please note that by default, images are only optimized for **production builds, not development builds**. However, this can get changed with the [`optimizeImagesInDev` config](/docs/nuxt-optimized-images/configuration#optimizeimagesindev).

</docs-alert>

<docs-alert variant="info">

Depending on your build/deployment setup, it is also possible to install these as devDependencies. Just make sure that the packages are available when you build your project.

</docs-alert>




[imagemin-mozjpeg]: https://www.npmjs.com/package/imagemin-mozjpeg
[imagemin-pngquant]: https://www.npmjs.com/package/imagemin-pngquant
[imagemin-optipng]: https://www.npmjs.com/package/imagemin-optipng
[imagemin-gifsicle]: https://www.npmjs.com/package/imagemin-gifsicle
[imagemin-svgo]: https://www.npmjs.com/package/imagemin-svgo
[webp-loader]: https://www.npmjs.com/package/webp-loader
[lqip-loader]: https://www.npmjs.com/package/lqip-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
[sqip-loader]: https://github.com/EmilTholin/sqip-loader
