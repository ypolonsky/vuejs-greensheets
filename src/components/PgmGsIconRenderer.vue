<template>
  <div>
    <div v-if="params.data !== undefined">
      <!--<router-link :to="{ path: '/greensheet/' + params.data.applId + '/PGM'}">PGM</router-link>-->
      <a :href="'#/greensheet/' + params.data.applId + '/PGM'">
        <img src="../assets/images/IconGreensheets.gif" alt="Program Greensheet" width="15" border="0" height="18">
      </a>
      <a v-if="params.data.iconOrder === 0 || params.data.iconOrder === 1" href="#" class="hint--right" aria-label="Can be submitted">
        <img src="../assets/images/asterisk.gif" alt="Can be submitted" width="24" border="0" height="18">
      </a>
      <a v-if="params.data.iconOrder === 0" href="#" class="hint--right" aria-label="OGA is waiting for Submission">
        <img src="../assets/images/thumbsup.gif" alt="OGA is waiting for Submission" width="24" border="0" height="18">
      </a>
    </div>
    <div v-else>
      <img src="../assets/images/spinner.gif" alt="Program Greensheet" width="15" border="0" height="18">{{params.value}}
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
    name: 'PrgGsIconRenderer'
  })
</script>

<style scoped>

</style>
