<template>
  <div>
    <h1>{{ applId + ' for ' + type}}</h1>
    <router-link :to="{ name: 'Program Search'}">Back to search</router-link>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
  export default {
    props: ['applId', 'type'],
    name: 'Grensheet'
  }
</script>

<style scoped>

</style>
