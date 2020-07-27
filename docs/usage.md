---
title: "Usage"
description: "You can import or require your images directly in your Vue components for optimizations"
createdAt: "2019-03-01T13:35:06Z"
publishedAt: "2019-03-01T13:35:06Z"
updatedAt: "2020-07-15T16:46:04Z"
position: 2
category: "Getting started"
---

You can import or require your images directly in your Vue components:

```vue
<template>
  <img src="~/assets/image.png">
</template>
```

or

```vue
<template>
  <img :src="require('~/assets/image.png')">
</template>
```

<docs-alert>

Please be aware that images only get optimized [in production by default](/docs/nuxt-optimized-images/configuration#optimizeimagesindev) to reduce the build time in your development environment.

</docs-alert>

If the file is below the [limit for inlining images](/docs/nuxt-optimized-images/configuration#inlineimagelimit), the `require(...)` will return a base64 `data-uri` (`data:image/jpeg;base64,...`).


## Query params

There are additional options you can specify as query params when you import the images.

* [`?include`](#include): Include the raw file directly (useful for SVG icons)
* [`?webp`](#webp): Convert a JPEG/PNG image to WebP on the fly
* [`?inline`](#inline): Force inlining an image (`data-uri`)
* [`?url`](#url): Force an URL for a small image (instead of `data-uri`)
* [`?original`](#original): Use the original image and do not optimize it
* [`?lqip`](#lqip): Generate a low-quality image placeholder
* [`?lqip-colors`](#lqip-colors): Extract the dominant colors of an image
* [`?sqip`](#sqip): Generate a low-quality svg-image placeholder
* [`?resize`](#resize): Resize an image

<docs-alert variant="info">

There are some cases where you don't want to reference a file or get a base64 `data-uri` but you actually want to include the raw file directly into your HTML. Especially for SVGs because you can't style them with CSS if they are in an `src` attribute on an image.

</docs-alert>

### ?include

The image will directly be included in your HTML without a `data-uri` or a reference to your file.

As described above, this is useful for SVGs so you can style them with CSS.

```vue
<template>
  <div v-html="require('~/assets/my-icon.svg?include')">
</template>

<!-- 
 Results in:

 <div>
   <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
     <path d="M8 0C3.589 0 0 3.589 0 8s3.589 ..." style="filled-opacity:1" fill-rule="evenodd">
     </path>
   </svg>
 </div>
-->
```

The image will still get optimized, even if it is directly included in your content (but by [default only in production](/docs/nuxt-optimized-images/configuration#optimizeimagesindev)).


### ?webp

<docs-alert>

Requires the optional optimization package [`webp-loader`][webp-loader]

</docs-alert>

WebP is an even better and smaller image format but it is still not that common.

If this `?webp` query parameter is specified, `@aceforth/nuxt-optimized-images` automatically converts a JPEG/PNG image to the new WebP format.

For [browsers that don't yet support WebP][caniuse-webp], you can also provide a fallback using the `<picture>` tag:

```vue
<template>
  <picture>
    <source :srcSet="require('~/assets/my-image.jpg?webp')" type="image/webp" />
    <source :srcSet="require('~/assets/my-image.jpg')" type="image/jpeg" />
    <img :src="require('~/assets/my-image.jpg')" />
  </picture>
</template>

<!-- 
 Results in:

<picture>
  <source srcSet="/_nuxt/images/d6816ecc.webp" type="image/webp" />
  <source srcSet="/_nuxt/images/5216de42.jpg" type="image/jpeg" />
  <img src="/_nuxt/images/5216de42.jpg" />
</picture>
-->
```

### ?inline

You can specify a [limit for inlining](/docs/nuxt-optimized-images/configuration#inlineimagelimit) images which will include it as a `data-uri` directly in your content instead of referencing a file if the file size is below that limit.

You usually don't want to specify a too high limit but there may be cases where you still want to inline larger images.

In this case, you don't have to set the global limit to a higher value but you can add an exception for a single image using the `?inline` query options.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?inline')">
</template>

<!-- 
 Results in:

 <img src="data:image/png;base64,..." />
-->
```

The inlining will only get applied to exactly this import, so if you import the image a second time without the `?inline` option, it will then get normally referenced as a file if it is above your limit.

### ?url

When you have an image smaller than your defined [limit for inlining](/docs/nuxt-optimized-images/configuration#inlineimagelimit), it normally gets inlined automatically.
If you don't want a specific small file to get inlined, you can use the `?url` query param to always get back an image URL, regardless of the inline limit.

<docs-alert variant="info">

If you are using this option a lot, it could also make sense to [disable the inlining](/docs/nuxt-optimized-images/configuration#inlineimagelimit) completely and use the [`?inline`](#inline) param for single files.

</docs-alert>

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?url')">
</template>

<!-- 
 Results in:

 <img src="/_nuxt/assets/5216de.jpg" />
-->
```

The inlining will only get disabled for exactly this import, so if you import the image a second time without the `?url` option, it will then get inlined again if it is below your limit.

### ?original

The image won't get optimized and it will be used as it is. It makes sense to use this query param if you know an image already got optimized so it doesn't get optimized again a second time.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?original')">
</template>
```

This can also be combined with the `?url` or `?inline` resource query (e.g. `?original&inline`).

### ?lqip

<docs-alert>

Requires the optional package [`lqip-loader`][lqip-loader]

</docs-alert>

When using this resource query, a very small (about `10x7 pixels`) image gets created. You can then display this image as a placeholder until the real (big) image has loaded.

You will normally stretch this tiny image to the same size as the real image is, like *medium.com* does.
To make the stretched image look better in chrome, check out [this solution](https://github.com/zouhir/lqip-loader/issues/5) and add a blur filter to your image.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?lqip')">
</template>

<!-- 
 Replaces the src with a tiny image in base64.
-->
```

or using [vue-lazyload][vue-lazyload] (a Vue.js plugin for lazyloading your images):

```vue
<template>
  <div v-lazy-container="{ selector: 'img' }">
    <img 
      :data-src="require('~/assets/my-image.jpg')" 
      :data-loading="require('~/assets/my-image.jpg?lqip')" 
    />
  </div>
</template>

<style scoped>
img[lazy='loading'] {
  filter: blur(15px);
}
</style>
```

### ?lqip-colors

<docs-alert>

Requires the optional package [`lqip-loader`][lqip-loader]

</docs-alert>

This resource query returns you an **array with hex values** of the dominant colors of an image. You can also use this as a placeholder until the real image has loaded (e.g. as a background) as the *Google Picture Search* does.

The number of colors returned can vary and depends on how many different colors your image has.


```vue
<template>
  <div :style="{ backgroundColor: require('~/assets/my-image.jpg?lqip-colors')[0] }" />
</template>

<!-- 
 * require('~/assets/my-image.jpg?lqip-colors')
 *
 * returns for example
 *
 * ['#0e648d', '#5f94b5', '#a7bbcb', '#223240', '#a4c3dc', '#1b6c9c']
-->
```

### ?sqip

<docs-alert>

Requires the optional package [`sqip-loader`][sqip-loader]

</docs-alert>

Another way to generate placeholders is using `sqip-loader`. When using this resource query, a very small **SVG image** gets created.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?sqip')">
</template>

<!-- 
 Replaces the src with a tiny svg-image.
-->
```


### ?resize

<docs-alert>

Requires the optional package [`responsive-loader`][responsive-loader] and either [`jimp`][jimp] (node implementation, slower) or [`sharp`][sharp] (binary, faster)

</docs-alert>

After the `?resize` resource query, you can add any other query of the [`responsive-loader`][responsive-loader] which allows you to resize images and create whole source sets.

```vue
<template>
  <div>
    <!-- single image -->
    <img :src="oneSize.src" />

    <!-- source set with multiple sizes -->
    <img :srcSet="multipleSizes.srcSet" :src="multipleSizes.src" />
  </div>
</template>

<script>
const oneSize = require('~/assets/my-image.jpg?resize&size=300');
const multipleSizes = require('~/assets/my-image.jpg?resize&sizes[]=300&sizes[]=600&sizes[]=1000');

export default {
  data() {
    return { oneSize, multipleSizes }
  }
}
</script>
```

<docs-alert variant="info">

If only the `size` or `sizes` param is used, the `?resize` param can also be omitted (e.g. `my-image.jpg?size=300`). But it is required for all other parameters of `responsive-loader`.

</docs-alert>

You can also set global configs in the [`responsive`](/docs/nuxt-optimized-images/configuration#responsive) property (in the `nuxt.config.js` file) and define, for example, default sizes which will get generated when you don't specify one for an image (e.g. only `my-image.jpg?resize`).



[caniuse-webp]: https://caniuse.com/#feat=webp
[vue-lazyload]: https://github.com/hilongjw/vue-lazyload
[webp-loader]: https://www.npmjs.com/package/webp-loader
[lqip-loader]: https://www.npmjs.com/package/lqip-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
[jimp]: https://www.npmjs.com/package/jimp
[sharp]: https://www.npmjs.com/package/sharp
[sqip-loader]: https://github.com/EmilTholin/sqip-loader
