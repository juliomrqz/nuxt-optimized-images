<template>
  <section class="container">
    <h1 class="title is-2">Inline</h1>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Inline (default)</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, key) in images" :key="key">
          <th>{{ key.split('-')[0] }}</th>
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
      const icons = ['code-solid', 'desktop-solid', 'glasses-solid', 'laptop-code-solid']
      const images = {}

      icons.forEach(i => {
        images[i] = {
          inline: require(`~/assets/images/fontawesome/${i}.svg`),
          url: require(`~/assets/images/fontawesome/${i}.svg?url`),
        }
      })

      return images
    }
  }
};
</script>
