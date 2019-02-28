<template>
  <div class="container">
    <Navbar />
    <div class="columns">
      <div class="column is-one-quarter">
        <Sidebar />
      </div>
      <div class="column">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style>
  .table tr td {
    width: 250px;
  }
</style>
