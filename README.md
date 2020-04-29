# :sunrise: :rocket: Nuxt Optimized Images

Automatically optimizes images used in Nuxt.js projects (JPEG, PNG, SVG, WebP and GIF).

> This module is inspired by the work of [Cyril Wanner](https://github.com/cyrilwanner) in [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images).

## Features

Image sizes can often get reduced up to 60%, but this is not the only thing `@mole-inc/nuxt-optimized-images` does:

* **Reduces image size** by optimizing images during build.
* Improves loading speed by providing **progressive images** (for formats that support it).
* JPEG/PNG images can be **converted to [`WebP` on the fly](./docs/usage.md#webp)** for an even smaller size.
* Can **[resize](./docs/usage.md#resize)** images or generate **low-quality image placeholders** ([lqip](./docs/usage.md#lqip)) and extract the dominant [colors](./docs/usage.md#lqip-colors) of it.
* Provides **[query params](./docs/usage.md#query-params)** for file-specific handling/settings.
* And supports these features already included in Nuxt.js:
  * **Content hash** to the file name so images can get cached on CDN level and in the browser for a long time.
  * **Inlined small images** to save HTTP requests and additional roundtrips.
  * Same URLs fo unchanged images over multiple builds for long time caching.


## Installation

:warning: `node >= 10` and `nuxt >= 2` are required.


```bash 
npm install --save-dev @mole-inc/nuxt-optimized-images
```

or

```bash 
yarn add --dev @mole-inc/nuxt-optimized-images
```

Add `@mole-inc/nuxt-optimized-images` to `buildModules` section of nuxt.config.js:

:warning: If you are using Nuxt `< 2.9.0`, use `modules` instead. 

```js
{
  buildModules: [
    '@mole-inc/nuxt-optimized-images',
  ],

  optimizedImages: {
    optimizeImages: true
  }
}
```

See the [configuration][docs-configuration] section for all available options.


:warning: Images won't get optimized out of the box. You have to install the optimization packages you really need in addition to this module. This doesn't force you to download big optimization libraries you don't even use. Please check out the table of all [optional optimization packages](#optimization-packages).

## Optimization Packages

You have to install the optimization packages you need in your project in addition to this module. Then, `@mole-inc/nuxt-optimized-images` detects all the supported packages and uses them.

**So you only have to install these packages with npm, there is no additional step needed after that.**

The following optimization packages are available and supported:

| Optimization Package | Description                                                                                                                                                                                             | Project Link              |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `@mole-inc/imagemin-mozjpeg`   | Optimizes JPEG images                                                                                                                                                                                   | [Link][imagemin-mozjpeg]  |
| `@mole-inc/imagemin-pngquant`  | Optimizes PNG images                                                                                                                                                                                    | [Link][imagemin-pngquant] |
| `@mole-inc/imagemin-optipng`   | Alternative for optimizing PNG images                                                                                                                                                                   | [Link][imagemin-optipng]  |
| `imagemin-gifsicle`  | Optimizes GIF images                                                                                                                                                                                    | [Link][imagemin-gifsicle] |
| `imagemin-svgo`      | Optimizes SVG images and icons                                                                                                                                                                          | [Link][imagemin-svgo]     |
| `@mole-inc/webp-loader`        | Optimizes WebP images and can convert JPEG/PNG images to WebP on the fly ([WebP resource query](./docs/usage.md#webp))                                                                                       | [Link][webp-loader]       |
| `@mole-inc/lqip-loader`        | Generates low quality image placeholders of an image ([lqip resource query](./docs/usage.md#lqip))                                                                       | [Link][lqip-loader]       |
| `responsive-loader`  | Can resize images on the fly and create multiple versions of it for a `srcSet`. **Important**: You need to additionally install either `jimp` (node implementation, slower) or `sharp` (binary, faster) | [Link][responsive-loader] |
| `sqip-loader`  | Loads images and exports tiny SQIP previews as `image/svg+xml` URL-encoded data | [Link][sqip-loader] |

Example: If you have JPG, PNG, and SVG images in your project, you would then need to run

```sh
npm install --save-dev @mole-inc/imagemin-mozjpeg @mole-inc/imagemin-pngquant imagemin-svgo

# or

yarn add --dev @mole-inc/imagemin-mozjpeg @mole-inc/imagemin-pngquant imagemin-svgo
```

To install **all** optional packages, run:
```sh
npm install --save-dev @mole-inc/imagemin-mozjpeg @mole-inc/imagemin-pngquant imagemin-gifsicle imagemin-svgo @mole-inc/webp-loader @mole-inc/lqip-loader responsive-loader sqip-loader sharp

# or

yarn add --dev @mole-inc/imagemin-mozjpeg @mole-inc/imagemin-pngquant imagemin-gifsicle imagemin-svgo @mole-inc/webp-loader @mole-inc/lqip-loader responsive-loader sqip-loader sharp
```

:warning: Please note that by default, images are only optimized for **production builds, not development builds**. However, this can get changed with the [`optimizeImagesInDev` config][docs-configuration-optimizeimagesindev].

## Documentation

- 📄 If you want extra details of how to configure and use this project, the **full documentation** is available at [https://mole-inc.github.io/nuxt-optimized-images/][docs].
- 🐞 For **Bug reports** or **Feature requests**, use the [Issues section][issues].

## License

Code released under the [MIT License][license-page].


![](https://ga-beacon.appspot.com/UA-65885578-17/aceforth/nuxt-optimized-images?pixel)

[docs]:  https://mole-inc.github.io/nuxt-optimized-images/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images
[docs-configuration]: https://mole-inc.github.io/nuxt-optimized-images/configuration/
[docs-configuration-optimizeimagesindev]: https://mole-inc.github.io/nuxt-optimized-images/configuration/?utm_source=github&utm_medium=readme&utm_campaign=nuxt-optimized-images#optimizeimagesindev
[issues]: https://github.com/mole-inc/nuxt-optimized-images/issues
[license-page]: https://github.com/mole-inc/nuxt-optimized-images/blob/master/LICENSE

[imagemin-mozjpeg]: https://www.npmjs.com/package/@mole-inc/imagemin-mozjpeg
[imagemin-pngquant]: https://www.npmjs.com/package/@mole-inc/imagemin-pngquant
[imagemin-optipng]: https://www.npmjs.com/package/@mole-inc/imagemin-optipng
[imagemin-gifsicle]: https://www.npmjs.com/package/imagemin-gifsicle
[imagemin-svgo]: https://www.npmjs.com/package/imagemin-svgo
[webp-loader]: https://www.npmjs.com/package/@mole-inc/webp-loader
[lqip-loader]: https://www.npmjs.com/package/@mole-inc/lqip-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
[sqip-loader]: https://www.npmjs.com/package/sqip-loader
