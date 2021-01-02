<template>
  <section class="container">
    <h1 class="title is-2">WebP</h1>

    <div class="notification is-warning">
      AVIF image optimization is not yet supported
    </div>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Original</th>
          <th>Converted to WebP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, key) in images" :key="key">
          <th>{{ key.toUpperCase() }}</th>
          <td v-for="(format, key2) in image" :key="key2">
            <a :href="format" target="_blank">
              <figure class="image is-3by2">
                <img :src="format">
              </figure>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  computed: {
    images() {
      return {
        jpg: {
          original: require("~/assets/images/pexels-photo-841303.jpg"),
          converted: require("~/assets/images/pexels-photo-841303.jpg?webp"),
        },
        png: {
          original: require("~/assets/images/pexels-photo-707194.png"),
          converted: require("~/assets/images/pexels-photo-707194.png?webp"),
        },
        webp: {
          original: require("~/assets/images/pexels-photo-841303.webp"),
          converted: require("~/assets/images/pexels-photo-841303.webp?webp"),
        },
        avif: {
          original: require("~/assets/images/pexels-photo-707194.avif"),
          converted: require("~/assets/images/pexels-photo-707194.avif?webp"),
        },
      };
    }
  }
};
</script>
