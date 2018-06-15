<template>
  <div>
    <div v-if="params.data !== undefined">
      <!--<router-link :to="{ path: '/greensheet/' + params.data.applId + '/SPEC'}">SPEC</router-link>-->
      <a :href="'#/greensheet/' + params.data.applId + '/SPEC'">
        <img src="../assets/images/IconGreensheets.gif" alt="Program Greensheet" width="15" border="0" height="18">
      </a>
    </div>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
import Vue from 'vue'
import Router from 'vue-router'

const router = new Router()

  export default Vue.extend({
    router,
    name: 'GmsGsIconRenderer'
  })
</script>

<style scoped>

</style>
