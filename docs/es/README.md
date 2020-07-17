---
title: "Visión General"
description: "Optimiza automáticamente las imágenes utilizadas en los proyectos en Nuxt.js (JPEG, PNG, SVG, WebP y GIF)"
created: "2019-03-01T13:35:06Z"
published: "2019-03-01T13:35:06Z"
modified: "2020-07-15T16:46:04Z"
position: 1
category: "Primeros Pasos"
---

# Imágenes Optimizadas para Nuxt

Optimiza automáticamente las imágenes utilizadas en los proyectos en Nuxt.js (JPEG, PNG, SVG, WebP y GIF).

> Este módulo está inspirado en el trabajo de [Cyril Wanner](https://github.com/cyrilwanner) en [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images).

## Características

El tamaño de las imágenes puede reducirse hasta un 60%, pero esto no es lo único que hace `@aceforth/nuxt-optimized-images`:

* **Reduce el tamaño de las imagenes** al optimizar las imágenes durante la compilación.
* Mejora la velocidad de carga al proporcionar **imágenes progresivas** (para formatos que lo soportan).
* Hace que las imágenes pequeñas se **guarden en línea** para ahorrar solicitudes HTTP y los viajes de ida y vuelta adicionales.
* Agrega un **hash de contenido** al nombre del archivo para que las imágenes puedan almacenarse en caché a nivel de CDN y en el navegador durante mucho tiempo (Este es el comportamiento por defecto de Nuxt.js).
* Mismas URLs de imágenes en múltiples compilaciones para un almacenamiento en caché a largo plazo.
* Proporciona **[parámetros de consulta (query params)](/es/docs/nuxt-optimized-images/usage#query-params)** para la gestión y configuración de archivos específicos.
* Las imágenes JPEG/PNG **se pueden convertir a [WebP sobre la marcha](/es/docs/nuxt-optimized-images/usage#webp)** para un tamaño aún más pequeño.
* Puede **[redimensionar](/es/docs/nuxt-optimized-images/usage#resize)** imágenes o generar **placeholders de baja calidad** ([lqip](/es/docs/nuxt-optimized-images/usage#lqip)) y extraer los [colores](/es/docs/nuxt-optimized-images/usage#lqip-colors) dominantes de las mismas.

## Instalación

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

Node >= 10 y Nuxt.js >= 2 son necesarios.

</docs-alert>


Añade `@aceforth/nuxt-optimized-images` a la sección `buildModules` de nuxt.config.js:

<docs-alert>

Si estás usando Nuxt `< 2.9.0`, usa `modules` en su lugar. 

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

Ve la sección de [configuración](/es/docs/nuxt-optimized-images/configuration) para todas las opciones disponibles.


<docs-alert variant="info">

Las imágenes no se optimizan por defecto. Tienes que instalar los paquetes de optimización además de este módulo.

Esto no te obliga a descargar grandes librerías de optimización que ni siquiera utilizas. Por favor, consulta la tabla de todos los [paquetes de optimización opcionales](#paquetes-de-optimizacion).

</docs-alert>

## Paquetes de Optimización

Además de este módulo, deberás instalar los paquetes de optimización que necesites en tu proyecto. Luego, `@aceforth/nuxt-optimized-images` detecta todos los paquetes soportados y los usa.

**Así que sólo tienes que instalar estos paquetes con npm, no hay ningún paso adicional necesario después de eso.**

Los siguientes paquetes de optimización están disponibles y soportados:

| Paquete de Optimización | Descripción                                                                                                                                                                                             | Enlace del Proyecto             |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `imagemin-mozjpeg`   | Optimiza las imágenes JPEG                                                                                                                                                                                   | [Enlace][imagemin-mozjpeg]  |
| `imagemin-pngquant`  | Optimiza las imágenes PNG                                                                                                                                                                                    | [Enlace][imagemin-pngquant] |
| `imagemin-optipng`   | Alternativa para la optimización de imágenes PNG                                                                                                                                                                   | [Enlace][imagemin-optipng]  |
| `imagemin-gifsicle`  | Optimiza las imágenes GIF                                                                                                                                                                                    | [Enlace][imagemin-gifsicle] |
| `imagemin-svgo`      | Optimiza las imágenes e iconos SVG                                                                                                                                                                          | [Enlace][imagemin-svgo]     |
| `webp-loader`        | Optimiza las imágenes WebP y puede convertir imágenes JPEG/PNG a WebP sobre la marcha ([consulta de recursos WebP](/es/docs/nuxt-optimized-images/usage#webp))                                                                                       | [Enlace][webp-loader]       |
| `lqip-loader`        | Genera placeholders de baja calidad y puede extraer los colores dominantes de una imagen ([consulta de recursos lqip](/es/docs/nuxt-optimized-images/usage#lqip))                                                                       | [Enlace][lqip-loader]       |
| `responsive-loader`  | Puede cambiar el tamaño de las imágenes sobre la marcha y crear múltiples versiones para `srcSet`. **Importante: Necesitas instalar adicionalmente `jimp` (implementación de node, más lento) o `sharp` (binario, más rápido)** | [Enlace][responsive-loader] |
| `sqip-loader`  | Carga imágenes y exporta pequeños placeholders como datos codificados por URL del tipo `image/svg+xml` | [Link][sqip-loader] |

Ejemplo: Si tienes imágenes JPG, PNG y SVG en tu proyecto, necesitarás ejecutar

```bash
npm install --save-dev imagemin-mozjpeg imagemin-pngquant imagemin-svgo

# o

yarn add --dev imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

Para instalar **todos** los paquetes opcionales, ejecuta:

```bash
npm install --save-dev imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader sharp

# o

yarn add --dev imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader sharp
```

<docs-alert>

Ten en cuenta que, por defecto, las imágenes sólo se optimizan para **compilaciones de producción, no para compilaciones de desarrollo**. Sin embargo, esto puede cambiar con la [configuración de `optimizeImagesInDev`](/es/docs/nuxt-optimized-images/configuration#optimizeimagesindev).

</docs-alert>

<docs-alert variant="info">

Dependiendo de tu configuración de compilación/despliegue, también es posible instalarlos como devDependencies. Sólo asegúrate de que los paquetes estén disponibles cuando construyas tu proyecto.

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
