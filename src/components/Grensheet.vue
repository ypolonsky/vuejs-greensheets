<template>
  <div>
    <h1>{{ applId + ' for ' + type}}</h1>
    <router-link :to="{ name: 'Program Search'}" @click.native="aboutBackToSearch">Back to search</router-link>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
  export default {
    props: ['applId', 'type'],
    name: 'Grensheet',
    methods: {
      aboutBackToSearch () {
        this.$store.commit('setAutosearch', true);
        console.log('Greensheet: about back to search')
      }
    }
  }
</script>

<style scoped>

</style>
