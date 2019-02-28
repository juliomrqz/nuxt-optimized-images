<template>
  <section class="container">
    <h1 class="title is-2">Optimized</h1>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Original</th>
          <th>Optimized</th>
          <th>Inline</th>
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
          original: require("~/assets/images/pexels-photo-841303.jpg?original"),
          optimized: require("~/assets/images/pexels-photo-841303.jpg"),
          inline: require("~/assets/images/pexels-photo-841303.jpg?inline"),
        },
        png: {
          original: require("~/assets/images/pexels-photo-707194.png?original"),
          optimized: require("~/assets/images/pexels-photo-707194.png"),
          inline: require("~/assets/images/pexels-photo-707194.png?inline"),
        },
        gif: {
          original: require("~/assets/images/giphy-11JTxkrmq4bGE0.gif?original"),
          optimized: require("~/assets/images/giphy-11JTxkrmq4bGE0.gif"),
          inline: require("~/assets/images/giphy-11JTxkrmq4bGE0.gif?inline"),
        },
        svg: {
          original: require("~/assets/images/pixabay-animals-1782013.svg?original"),
          optimized: require("~/assets/images/pixabay-animals-1782013.svg"),
          inline: require("~/assets/images/pixabay-animals-1782013.svg?inline"),
        }
      };
    }
  }
};
</script>
