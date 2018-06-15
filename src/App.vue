<template>
  <div class="row">
    <!-- Header -->
    <router-view name="header"></router-view>
    <div id="content" class="container main">
      <!-- main content -->
      <router-view/>
    </div>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "assets/css/font-awesome-4.7.0.min.css";
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "../node_modules/v-autocomplete/dist/v-autocomplete.css";
  @import "assets/css/I2E-template.css";
  @import "../node_modules/ag-grid/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css";
  @import "assets/css/hint.css";
  @import "../node_modules/chosen-js/chosen.css";
  /*@import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  body {
    font-size: 16px;
    color: #000000;
  }
  .form-control {
    font-size: 16px;
  }
  .chosen-container {
    width: 100% !important;
  }
  .chosen-container-multi .chosen-choices {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 3px 6px;
  }
  .chosen-container-active .chosen-choices {
    border: 1px solid #5897fb;
  }
</style>
