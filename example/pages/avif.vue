<template>
  <section class="container">
    <h1 class="title is-2">AVIF (no optimization)</h1>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, index) in images" :key="index">
          <td>
            <a :href="image" target="_blank">
              <figure class="image is-3by2">
                <img :src="image">
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
      return [
        require("~/assets/images/pexels-photo-707194.avif"),
        require("~/assets/images/pexels-photo-841303.avif"),
      ];
    },
  },
};
</script>
