<template>
  <!-- Body Content start -->
  <div class="col-md-12">
    <div :class="{'alert' : true, 'alert-danger': isError,  'alert-warning' : isWarning, 'alert-success': isSuccess}" role="alert">
    <!--<div class="alert ${(alertType == 'error') ? 'alert-danger' : (alertType == 'warning' ? 'alert-warning' : 'alert-success')}" role="alert">-->
      <strong> {{ header }}</strong> <span class="span-alert-message" v-html="message"></span>
    </div>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */

  export default {
    computed: {
      isSuccess: function () {
        return this.$store.getters.alertType === 'success';
      },
      isWarning: function () {
        return this.$store.getters.alertType === 'warning';
      },
      isError: function () {
        return this.$store.getters.alertType === 'error';
      },
      header: function () {
        return this.$store.getters.alertMessageHeader;
      },
      message: function () {
        return this.$store.getters.alertMessage;
      }
    }
  }
</script>

<style scoped>
  .alert {
    margin-top: 20px;
  }
</style>
