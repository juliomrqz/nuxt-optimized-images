---
title: "Uso"
description: "Puedes importar o requerir tus imágenes directamente en los componentes de su Vue para su optimización"
createdAt: "2019-03-01T13:35:06Z"
publishedAt: "2019-03-01T13:35:06Z"
updatedAt: "2020-07-15T16:46:04Z"
position: 2
category: "Primeros Pasos"
---

Puede importar o requerir sus imágenes directamente en tus componentes Vue:

```vue
<template>
  <img src="~/assets/image.png">
</template>
```

o

```vue
<template>
  <img :src="require('~/assets/image.png')">
</template>
```

<docs-alert>

Tenga en cuenta que las imágenes sólo se optimizan [en producción de forma predeterminada](/es/docs/nuxt-optimized-images/configuration#optimizeimagesindev) para reducir el tiempo de compilación en tu entorno de desarrollo.

</docs-alert>


Si el archivo está por debajo del [límite para imágenes en línea](/es/docs/nuxt-optimized-images/configuration#inlineimagelimit), el `require(...)` devolverá una una `data-uri` del tipo base64 (`data:image/jpeg;base64,...`).


## Parámetros de Consulta

Hay opciones adicionales que puede especificar como parámetros de consulta cuando importes las imágenes.

* [`?include`](#include): Incluye directamente el archivo sin procesar (útil para los iconos SVG)
* [`?webp`](#webp): Convierte una imagen JPEG/PNG a WebP sobre la marcha
* [`?inline`](#inline): Forzar el inlineado de una imagen (`data-uri`)
* [`?url`](#url): Forzar una URL para una imagen pequeña (en lugar de `data-uri`)
* [`?original`](#original): Utiliza la imagen original y no la optimiza
* [`?lqip`](#lqip): Generar un placeholder de baja calidad
* [`?lqip-colors`](#lqip-colors): Extrae los colores dominantes de una imagen
* [`?sqip`](#sqip): * [`?sqip`](#sqip): Generate a low-quality svg-image placeholder del tipo SVG
* [`?resize`](#resize): Cambia el tamaño de una imagen

<docs-alert variant="info">

Hay algunos casos en los que no quieres hacer referencia a un archivo u obtener un `data-uri` de base64 pero en realidad lo quieres es incluir el archivo sin procesar directamente en tu HTML. Especialmente para SVGs porque no se puede estilizar con CSS si están en un atributo `src` en una imagen.

</docs-alert>

### ?include

La imagen se incluirá directamente en tu HTML sin un `data-uri` o una referencia a tu archivo.

Como se ha descrito anteriormente, esto es útil para los SVGs para que puedas estilizarlos con CSS.

```vue
<template>
  <div v-html="require('~/assets/my-icon.svg?include')">
</template>

<!-- 
 Resulta en:

 <div>
   <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
     <path d="M8 0C3.589 0 0 3.589 0 8s3.589 ..." style="filled-opacity:1" fill-rule="evenodd">
     </path>
   </svg>
 </div>
-->
```

La imagen seguirá siendo optimizada, incluso si se incluye directamente en tu contenido (pero por [defecto sólo en producción](/es/docs/nuxt-optimized-images/configuration#optimizeimagesindev)).

### ?webp

<docs-alert>

Requiere el paquete de optimización opcional [`webp-loader`][webp-loader]

</docs-alert>

WebP es un formato de imagen mejor y más pequeño, pero todavía no es tan común.

Si se especifica este parámetro de consulta `?webp`, `@aceforth/nuxt-optimized-images` convierte automáticamente una imagen JPEG/PNG al nuevo formato WebP.

Para [los navegadores que aún no son compatibles con WebP][caniuse-webp], también puedes proporcionar una solución alternativa utilizando la etiqueta `<picture>`:

```vue
<template>
  <picture>
    <source :src="require('~/assets/my-image.jpg?webp')" type="image/webp" />
    <source :src="require('~/assets/my-image.jpg')" type="image/jpeg" />
    <img :src="require('~/assets/my-image.jpg')" />
  </picture>
</template>

<!-- 
 Resulta en:

<picture>
  <source srcSet="/_nuxt/images/d6816ecc.webp" type="image/webp" />
  <source srcSet="/_nuxt/images/5216de42.jpg" type="image/jpeg" />
  <img src="/_nuxt/images/5216de42.jpg" />
</picture>
-->
```

### ?inline

Puede especificar un [límite para las imágenes en línea](/es/docs/nuxt-optimized-images/configuration#inlineimagelimit) que se incluirán como un `data-uri` directamente en tu contenido en lugar de hacer referencia a un archivo si el tamaño del archivo está por debajo de ese límite.

Por lo general, no deseas especificar un límite demasiado alto, pero puede haber casos en los que aún desees incluir imágenes más grandes en línea.

En este caso, no tienes que establecer el límite global a un valor mayor, pero puedes añadir una excepción para una sola imagen utilizando las opciones de consulta `?inline`.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?inline')">
</template>

<!-- 
 Resulta en:

 <img src="data:image/png;base64,..." />
-->
```

El inline sólo se aplicará exactamente a esta importación, así que si importas la imagen por segunda vez sin la opción `?inline`, entonces se hará referencia como sin un archivo está por encima de su límite.

### ?url

Cuando tiene una imagen más pequeña que el [límite definido para el inlineado](/es/docs/nuxt-optimized-images/configuration#inlineimagelimit), normalmente se rellena automáticamente. Si no quieres que un archivo pequeño específico sea inlineado, puedes usar el parámetro de consulta `?url` para obtener siempre una URL de imagen, sin importar el límite de inlineado.

<docs-alert variant="info">

Si estás usando mucho esta opción, podría tener sentido [deshabilitar el inline](/es/docs/nuxt-optimized-images/configuration#inlineimagelimit) completamente y usar el parámetro [`?inline`](#inline) para archivos individuales.

</docs-alert>

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?url')">
</template>

<!-- 
 Resulta en:

 <img src="/_nuxt/assets/5216de.jpg" />
-->
```

El inlineado sólo se deshabilitará exactamente para esta importación, así que si importas la imagen por segunda vez sin la opción `?url`, entonces se volverá al inlineado si está por debajo de su límite.

### ?original

La imagen no se optimizará y se utilizará tal cual. Tiene sentido utilizar este parámetro de consulta si sabe que una imagen ya ha sido optimizada, por lo que no se vuelve a optimizar por segunda vez.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?original')">
</template>
```

También puede combinarse con la consulta de recursos `?url` o `?inline` (por ejemplo, `?original&inline`).

### ?lqip

<docs-alert>

Requiere el paquete opcional [`lqip-loader`][lqip-loader]

</docs-alert>

Cuando se utiliza esta consulta de recursos, se crea una imagen muy pequeña (de unos 10x7 píxeles). Puedes entonces mostrar esta imagen como un placeholder hasta que la imagen real (grande) se haya cargado.

Normalmente estirarás esta pequeña imagen al mismo tamaño que la imagen real, como hace *medium.com*. Para que la imagen estirada se vea mejor en chrome, echa un vistazo a esta solución y añade un filtro de desenfoque a tu imagen.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?lqip')">
</template>

<!-- 
 Reemplaza el src con una pequeña imagen en base64.
-->
```

o usando [vue-lazyload][vue-lazyload] (un plugin Vue.js para cargar de forma retardada tus imágenes):

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

Requiere el paquete opcional [`lqip-loader`][lqip-loader].

</docs-alert>

Esta consulta de recurso te devuelve un **array con valores hexadecimales** de los colores dominantes de una imagen. También puedes utilizarlo como placeholder hasta que la imagen real se haya cargado (por ejemplo, como fondo) como lo hace el *Buscador de Imágenes de Google*.

El número de colores devueltos puede variar y depende de cuántos colores diferentes tenga tu imagen.

```vue
<template>
  <div :style="{ backgroundColor: require('~/assets/my-image.jpg?lqip-colors')[0] }" />
</template>

<!-- 
 * require('~/assets/my-image.jpg?lqip-colors')
 *
 * devuelve por ejemplo
 *
 * ['#0e648d', '#5f94b5', '#a7bbcb', '#223240', '#a4c3dc', '#1b6c9c']
-->
```

### ?sqip

<docs-alert>

Requiere el paquete opcional [`sqip-loader`][sqip-loader]

</docs-alert>

Otra forma de generar placeholders es usando `sqip-loader`. Cuando se utiliza esta consulta de recursos, se crea una imagen **SVG** muy pequeña.

```vue
<template>
  <img :src="require('~/assets/my-image.jpg?sqip')">
</template>

<!-- 
 Reemplaza el src con una pequeña imagen SVG.
-->
```

### ?resize

<docs-alert>

Requiere el paquete opcional [`responsive-loader`][responsive-loader] y también [`jimp`][jimp] (implementación en node, más lenta) o [`sharp`][sharp] (binario, más rápido)

</docs-alert>

Después de la consulta de recursos `?resize`, puedes añadir cualquier otra consulta del [`responsive-loader`][responsive-loader] que te permites redimensionar las imágenes y crear conjuntos de orígenes enteros.

```vue
<template>
  <div>
    <!-- única imagen -->
    <img :src="oneSize.src" />

    <!-- juego de orígenes con múltiples tamaños -->
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

Si sólo se utiliza el parámetro `size` o `sizes`, el parámetro `?resize` también puede omitirse (p. ej. `my-image.jpg?size=300`). Pero es necesario para todos los demás parámetros de `responsive-loader`.

</docs-alert>

También puedes establecer configuraciones globales en la propiedad [`responsive`](/es/docs/nuxt-optimized-images/configuration#responsive) (en el archivo `nuxt.config.js`) y definir, por ejemplo, los tamaños predeterminados que se generarán cuando no especifiques uno para una imagen (por ejemplo, sólo `my-image.jpg?resize`).


[caniuse-webp]: https://caniuse.com/#feat=webp
[vue-lazyload]: https://github.com/hilongjw/vue-lazyload
[webp-loader]: https://www.npmjs.com/package/webp-loader
[lqip-loader]: https://www.npmjs.com/package/lqip-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
[jimp]: https://www.npmjs.com/package/jimp
[sharp]: https://www.npmjs.com/package/sharp
[sqip-loader]: https://github.com/EmilTholin/sqip-loader
