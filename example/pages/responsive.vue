<template>
  <section class="container">
    <h1 class="title is-2">Responsive</h1>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Original</th>
          <th>One Size</th>
          <th>Multiple Sizes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, key) in images" :key="key">
          <th>{{ key.toUpperCase() }}</th>
          <td v-for="(format, key2) in image" :key="key2">
            <a :href="format" target="_blank">
              <figure class="image is-3by2">
                <img v-if="format.src" :src="format.src" :srcSet="format.srcSet">
                <img v-else :src="format">
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
          oneSize: require("~/assets/images/pexels-photo-841303.jpg?resize&size=300"),
          multipleSizes: require("~/assets/images/pexels-photo-841303.jpg?resize&sizes[]=300&sizes[]=600&sizes[]=1000"),
        },
        png: {
          original: require("~/assets/images/pexels-photo-707194.png?original"),
          oneSize: require("~/assets/images/pexels-photo-707194.png?resize&size=300"),
          multipleSizes: require("~/assets/images/pexels-photo-707194.png?resize&sizes[]=300&sizes[]=600&sizes[]=1000"),
        },
        webp: {
          original: require("~/assets/images/pexels-photo-707194.png?original&format=webp"),
          oneSize: require("~/assets/images/pexels-photo-707194.png?resize&size=300&format=webp"),
          multipleSizes: require("~/assets/images/pexels-photo-707194.png?resize&sizes[]=300&sizes[]=600&sizes[]=1000&format=webp"),
        }
      };
    }
  }
};
</script>
