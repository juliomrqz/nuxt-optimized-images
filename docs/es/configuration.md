---
title: "Configuración"
description: "Las opciones predeterminadas para estos optimizadores deberían ser suficientes en la mayoría de los casos, pero puede sobrescribir todas las opciones disponibles si lo deseas"
createdAt: "2019-03-01T13:35:06Z"
publishedAt: "2019-03-01T13:35:06Z"
updatedAt: "2020-07-15T16:46:04Z"
position: 3
category: "Primeros Pasos"
---

Este módulo utiliza [img-loader](https://www.npmjs.com/package/img-loader) por debajo el cual se basa en [mozjpeg][imagemin-mozjpeg], [optipng][imagemin-optipng], [gifsicle][imagemin-gifsicle] y [svgo][imagemin-svgo].

Las opciones predeterminadas para estos optimizadores deberían ser suficientes en la mayoría de los casos, pero puede sobrescribir todas las opciones disponibles si lo deseas.

## handleImages

- Tipo: `string[]`
- Por defecto: `['jpeg', 'png', 'svg', 'webp', 'gif']`

`@aceforth/nuxt-optimized-images` registra el cargador webpack para todos estos tipos de archivos.

Si no quieres que uno de estos sea manejado por `@aceforth/nuxt-optimized-images` porque, por ejemplo, tienes otro plugin o una regla de carga personalizada, simplemente retírela del array.

Ten en cuenta que una imagen que se está manejando no significa que también se optimice automáticamente. El paquete de optimización requerido para esa imagen también tiene que ser instalado. Por favor, lea la sección [paquetes de optimización](/es/docs/nuxt-optimized-images#paquetes-de-optimizacion) para más información.

Si una imagen se maneja pero no se optimiza, significa que la imagen original se utilizará y se copiará para la compilación.

## inlineImageLimit

- Tipo: `number`
- Por defecto: `1000`

Los archivos más pequeños serán alineados con un `data-uri` por [url-loader](https://www.npmjs.com/package/url-loader).

Este número define el tamaño máximo del archivo (en bytes) para que las imágenes se alineen. Si una imagen es más grande, se copiará a la carpeta estática de Nuxt.js. Las imágenes se optimizarán en ambos casos.

Para desactivar completamente el inlineado de la imagen, establece este valor en `-1`. Entonces, siempre obtendrás una URL de la imagen.

## imagesName

- Tipo: `function`
- Por defecto: `({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]'`

El nombre de archivo de las imágenes optimizadas.

<docs-alert>

Asegúrate de mantener el fragmento `[hash]` para que reciban un nuevo nombre de archivo si el contenido cambia.

</docs-alert>

## responsiveImagesName

- Tipo: `function`
- Por defecto: `({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]'`

El nombre de archivo de las imágenes responsive.

<docs-alert>

Asegúrate de mantener el fragmento `[hash]` para que reciban un nuevo nombre de archivo si el contenido cambia.

</docs-alert>

## optimizeImagesInDev

- Tipo: `boolean`
- Por defecto: `false`

Para un desarrollo más rápido y HMR, las imágenes no se optimizan de forma predeterminada cuando se ejecutan en modo de desarrollo. **En producción, las imágenes siempre se optimizan, independientemente de este ajuste.**

## mozjpeg

<docs-alert>

Requiere el paquete de optimización opcional [`imagemin-mozjpeg`][imagemin-mozjpeg].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

[mozjpeg][imagemin-mozjpeg] se utiliza para optimizar las imágenes JPEG. Puede especificar las opciones para ello aquí. **Las opciones predeterminadas de `mozjpeg` se utilizan si se omite esta opción.**

## pngquant

<docs-alert>

Requiere el paquete de optimización opcional [`imagemin-pngquant`][imagemin-pngquant].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

[pngquant][imagemin-pngquant] se utiliza para optimizar las imágenes PNG por defecto. **Las opciones predeterminadas de `pngquant` se utilizan si omite esta opción.**

## optipng

<docs-alert>

Requiere el paquete de optimización opcional [`imagemin-optipng`][imagemin-optipng].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

[optipng][imagemin-optipng] es una forma alternativa de optimizar las imágenes PNG. Puedes especificar las opciones para ello aquí. **Las opciones predeterminadas de `optipng` se utilizan si omite esta opción.**

## gifsicle

<docs-alert>

Requiere el paquete de optimización opcional [`imagemin-gifsicle`][imagemin-gifsicle].

</docs-alert>

- Tipo: `object`
- Por defecto:

```javascript
{
    interlaced: true,
    optimizationLevel: 3,
}
```

[gifsicle][imagemin-gifsicle] se utiliza para optimizar las imágenes GIF. Puedes especificar las opciones para ello aquí. **Las opciones predeterminadas de `gifsicle` se utilizan si omite esta opción.**

## svgo

<docs-alert>

Requiere el paquete de optimización opcional [`imagemin-svgo`][imagemin-svgo].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

[svgo][imagemin-svgo] se utiliza para optimizar las imágenes e iconos svg. Puedes especificar las opciones para ello aquí. **Las opciones predeterminadas de `svgo` se utilizan si omite esta opción.**

Los plugins svgo pueden deshabilitarse o habilitarse en el array de plugins:

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

Requiere el paquete de optimización opcional [`webp-loader`][webp-loader].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

[imagemin-webp][webp-loader] se utiliza para optimizar las imágenes de WebP y convertir otros formatos a WebP. Puedes especificar las opciones para ello aquí. **Las opciones predeterminadas de `imagemin-webp` se utilizan si omite esta opción.**

## responsive

<docs-alert>

Requiere el paquete de optimización opcional [`responsive-loader`][responsive-loader].

</docs-alert>

- Tipo: `object`
- Por defecto: `{}`

La configuración para [`responsive-loader`][responsive-loader] puede definirse aquí.

## defaultImageLoader

<docs-alert>

Requiere el paquete de optimización opcional `responsive-loader`.

</docs-alert>

- Tipo: `string`
- Por defecto: `'img-loader'`

Por defecto, img-loader maneja la mayoría de las peticiones.

<docs-alert variant="info">

Si usas mucho `responsive-loader` y no quieres añadir el parámetro de consulta [`?resize`](/es/docs/nuxt-optimized-images/usage#resize) a cada requerimiento, puedes establecer este valor en `'responsive-loader'`.

Después de eso, `responsive-loader` manejará *todas* las imágenes JPEG y PNG por defecto, incluso sin un parámetro de consulta adicional. Ten en cuenta que no puedes usar ninguno de los [parámetros de consulta que `@aceforth/nuxt-optimized-images`](/es/docs/nuxt-optimized-images/usage)  ofrece en estas imágenes porque la petición se reenvía y no se modifica.

Todos los demás formatos (SVG, WEBP y GIF) siguen funcionando como antes con `img-loader` y por lo tanto tienen todos los parámetros de consulta disponibles.

</docs-alert>

## optimizeImages

- Tipo: `boolean`
- Por defecto: `true`

Si no deseas que las imágenes sean optimizadas, puedes establecer este valor en `false'.

<docs-alert>

Si no tienes ningún paquete de optimización instalado y esta opción está configurada como `true`, no se optimizará ninguna imagen. En este caso, se imprime una advertencia en la consola durante la compilación para informarte sobre una posible mala configuración.

</docs-alert>


[imagemin-mozjpeg]: https://www.npmjs.com/package/imagemin-mozjpeg
[imagemin-pngquant]: https://www.npmjs.com/package/imagemin-pngquant
[imagemin-optipng]: https://www.npmjs.com/package/imagemin-optipng
[imagemin-gifsicle]: https://www.npmjs.com/package/imagemin-gifsicle
[imagemin-svgo]: https://www.npmjs.com/package/imagemin-svgo
[webp-loader]: https://www.npmjs.com/package/webp-loader
[responsive-loader]: https://www.npmjs.com/package/responsive-loader
