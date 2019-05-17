<template>
  <section class="container">
    <h1 class="title is-2">SQIP placeholders</h1>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Original</th>
          <th>Placeholder</th>
          <th>Placeholder (CSS blur)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, key) in images" :key="key">
          <th>{{ key.toUpperCase() }}</th>
          <td>
            <a :href="image.original" target="_blank">
              <figure class="image is-3by2">
                <img :src="image.original">
              </figure>
            </a>
          </td>
          <td>
            <a :href="image.placeholder" target="_blank">
              <figure class="image is-3by2">
                <img
                  :src="image.placeholder.preview"
                  :height="image.placeholder.height"
                  :width="image.placeholder.width">
              </figure>
            </a>
          </td>
          <td>
            <figure class="image is-3by2">
              <img :src="image.placeholder" class="blur">
            </figure>
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
          placeholder: require("~/assets/images/pexels-photo-841303.jpg?sqip")
        },
        png: {
          original: require("~/assets/images/pexels-photo-707194.png?original"),
          placeholder: require("~/assets/images/pexels-photo-707194.png?sqip")
        }
      };
    }
  }
};
</script>

<style scoped>
img.blur {
  filter: blur(25px);
}

.table tr td {
  width: 200px;
}

.image.is-96x96 {
  display: inline-block;
}
</style>
