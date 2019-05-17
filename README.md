[![Bazzite Project](https://img.shields.io/badge/Bazzite-project-blue.svg)](https://www.bazzite.com/docs/nuxt-optimized-images)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/db0e010ec71b462b8732b926e5799cc6)](https://www.codacy.com/app/bazzite/nuxt-optimized-images?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bazzite/nuxt-optimized-images&amp;utm_campaign=Badge_Grade)
[![Travis](https://img.shields.io/travis/bazzite/nuxt-optimized-images.svg)](https://travis-ci.org/bazzite/nuxt-optimized-images)
[![David](https://img.shields.io/david/peer/bazzite/nuxt-optimized-images.svg)](https://david-dm.org/bazzite/nuxt-optimized-images?type=peer)
[![David](https://img.shields.io/david/dev/bazzite/nuxt-optimized-images.svg)](https://david-dm.org/bazzite/nuxt-optimized-images?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/bazzite/nuxt-optimized-images.svg)](https://greenkeeper.io/)
[![version](https://img.shields.io/npm/v/@bazzite/nuxt-optimized-images.svg)](https://www.npmjs.com/package/@bazzite/nuxt-optimized-images)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bazzite/nuxt-optimized-images/develop/LICENSE)

# :sunrise: :rocket: Nuxt Optimized Images

Automatically optimizes images used in Nuxt.js projects (JPEG, PNG, SVG, WebP and GIF).

> This module is inspired by the work of [Cyril Wanner](https://github.com/cyrilwanner) in [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images).

*Read this in other languages: [English][docs], [Español][docs-es]*

## Features

Image sizes can often get reduced up to 60%, but this is not the only thing `@bazzite/nuxt-optimized-images` does:

* **Reduces image size** by optimizing images during build.
* Improves loading speed by providing **progressive images** (for formats that support it).
* JPEG/PNG images can be **converted to [`WebP` on the fly](./usage/README.md#webp)** for an even smaller size.
* Can **[resize](./usage/README.md#resize)** images or generate **low-quality image placeholders** ([lqip](./usage/README.md#lqip)) and extract the dominant [colors](./usage/README.md#lqip-colors) of it.
* Provides **[query params](./usage/README.md#query-params)** for file-specific handling/settings.
* And supports these features already included in Nuxt.js:
  * **Content hash** to the file name so images can get cached on CDN level and in the browser for a long time.
  * **Inlined small images** to save HTTP requests and additional roundtrips.
  * Same URLs fo unchanged images over multiple builds for long time caching.


## Installation

:warning: `node >= 8` and `nuxt >= 2` are required.


```bash 
npm install @bazzite/nuxt-optimized-images
```

or

```bash 
yarn add @bazzite/nuxt-optimized-images
```

Add `@bazzite/nuxt-optimized-images` to modules section of nuxt.config.js:

```js
{
  modules: [
    '@bazzite/nuxt-optimized-images',
  ],

  optimizedImages: {
    optimizeImages: true
  }
}
```

See the [configuration][docs-configuration] section for all available options.


:warning: Images won't get optimized out of the box. You have to install the optimization packages you really need in addition to this module. This doesn't force you to download big optimization libraries you don't even use. Please check out the table of all [optional optimization packages](#optimization-packages).

## Optimization Packages

You have to install the optimization packages you need in your project in addition to this module. Then, `@bazzite/nuxt-optimized-images` detects all the supported packages and uses them.

**So you only have to install these packages with npm, there is no additional step needed after that.**

The following optimization packages are available and supported:

| Optimization Package | Description                                                                                                                                                                                             | Project Link              |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `imagemin-mozjpeg`   | Optimizes JPEG images                                                                                                                                                                                   | [Link][imagemin-mozjpeg]  |
| `imagemin-pngquant`  | Optimizes PNG images                                                                                                                                                                                    | [Link][imagemin-pngquant] |
| `imagemin-optipng`   | Alternative for optimizing PNG images                                                                                                                                                                   | [Link][imagemin-optipng]  |
| `imagemin-gifsicle`  | Optimizes GIF images                                                                                                                                                                                    | [Link][imagemin-gifsicle] |
| `imagemin-svgo`      | Optimizes SVG images and icons                                                                                                                                                                          | [Link][imagemin-svgo]     |
| `webp-loader`        | Optimizes WebP images and can convert JPEG/PNG images to WebP on the fly ([WebP resource query](./usage/README.md#webp))                                                                                       | [Link][webp-loader]       |
| `lqip-loader`        | Generates low quality image placeholders and can extract the dominant colors of an image ([lqip resource query](./usage/README.md#lqip))                                                                       | [Link][lqip-loader]       |
| `responsive-loader`  | Can resize images on the fly and create multiple versions of it for a `srcset`. **Important**: You need to additionally install either `jimp` (node implementation, slower) or `sharp` (binary, faster) | [Link][responsive-loader] |
| `sqip-loader`  | Loads images and exports tiny SQIP previews as `image/svg+xml` URL-encoded data | [Link][sqip-loader] |

Example: If you have JPG, PNG, and SVG images in your project, you would then need to run

```sh
npm install imagemin-mozjpeg imagemin-pngquant imagemin-svgo

# or

yarn add imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

To install **all** optional packages, run:
```sh
npm install imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader jimp

# or

yarn add imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader jimp
```

:warning: Please note that by default, images are only optimized for **production builds, not development builds**. However, this can get changed with the [`optimizeImagesInDev` config][docs-configuration-optimizeimagesindev].

## Documentation & Support

- If you want extra details of how to configure and use this project, the **full documentation** is available at [https://www.bazzite.com/docs/nuxt-optimized-images/][docs].
- For **Bug reports** or **Feature requests**, use the [Issues section][issues].
- You may also want to **follow the company** supporting this project [on Twitter][twitter].

## Professional Support

This project is sponsored by [Bazzite][bazzite-website]. If you require Professional Assistance on your project(s), please contact us at [https://www.bazzite.com/contact][contact-page].

## Code of Conduct

Everyone participating in this project is expected to agree to abide by the [Code of Conduct][code-of-conduct].

## License

Code released under the [MIT License][license-page].


[docs]: https://www.bazzite.com/docs/nuxt-optimized-images/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[docs-es]: https://www.bazzite.com/es/docs/nuxt-optimized-images/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[docs-configuration]: https://www.bazzite.com/docs/nuxt-optimized-images/configuration/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[docs-configuration-optimizeimagesindev]: https://www.bazzite.com/docs/nuxt-optimized-images/configuration/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images#optimizeimagesindev
[issues]: https://github.com/bazzite/nuxt-optimized-images/issues
[twitter]: https://bazzite.xyz/Twitter
[bazzite-website]: https://www.bazzite.com?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[contact-page]: https://www.bazzite.com/contact?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[code-of-conduct]: https://www.bazzite.com/open-source/code-of-conduct?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[license-page]: https://github.com/bazzite/nuxt-optimized-images/blob/develop/LICENSE

[imagemin-mozjpeg]: https://www.npmjs.com/package/imagemin-mozjpeg
[imagemin-pngquant]: https://www.npmjs.com/package/imagemin-pngquant
[imagemin-optipng]: https://www.npmjs.com/package/imagemin-optipng
[imagemin-gifsicle]: https://www.npmjs.com/package/imagemin-gifsicle
[imagemin-svgo]: https://www.npmjs.com/package/imagemin-svgo
[webp-loader]: https://www.npmjs.com/package/webp-loader
[lqip-loader]: https://www.npmjs.com/package/lqip-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
[sqip-loader]: https://github.com/EmilTholin/sqip-loader
