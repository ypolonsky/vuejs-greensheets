<template>
  <div>
    <div v-if="params.data !== undefined">
      <!--<router-link :to="{ path: '/greensheet/' + params.data.applId + '/PGM'}">PGM</router-link>-->
      <!--<a :href="'/vv/greensheet/' + params.data.applId + '/PGM'">-->
      <!--<a @click="console.log('ON CLICK ' + params.context)" href="#">-->
      <a @click="params.context.openGreensheet(params.data.applId, 'PGM')" href="#">
      <!--<a @click="onclick(params)" href="#">-->
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
// import Router from 'vue-router'

  export default Vue.extend({
    name: 'PrgGsIconRenderer',
    methods: {
      onclick (params) {
        // for (var name in params.context) {
        //   console.log('IN CONTEXT ' + name + '=' + params.context[name])
        // }
        // console.log('On click: ' + params);
        // console.log('On click: ' + params.context);
        return false;
      }
    }
  })
</script>

<style scoped>

</style>
