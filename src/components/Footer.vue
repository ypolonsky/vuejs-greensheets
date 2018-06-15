<template>
  <footer class="site-footer">
    <a class="cd-top" href="#0" title="back to top"><i class="fa fa-chevron-up fa-2x" id="btop"></i></a>
    <div style="margin-top: 15px;">
      <div id="content">
        <div class="columns">
          <ul>
            <li>
              <a href="https://inside.era.nih.gov/index.htm" target="_blank">eRA/IMPACII</a> &nbsp;|
            </li>
            <li>
              <a href="http://www.cancer.gov/policies/accessibility" target="_blank">Accessibility</a>&nbsp;|
            </li>
            <li>
              <a href="http://www.cancer.gov/policies/disclaimer" target="_blank">Disclaimer</a>&nbsp;|
            </li>
            <li>
              <a href="http://www.cancer.gov/policies/foia" target="_blank">FOIA</a>&nbsp;|
            </li>
            <li class="last">
              <a href="http://www.cancer.gov/policies/privacy-security" target="_blank">Privacy &amp; Security</a>
            </li><br>

            <li>
              <a href="http://www.hhs.gov" target="_blank">U.S. Department of Health and Human Services</a>&nbsp;|
            </li>
            <li>
              <a href="http://www.nih.gov" target="_blank">National Institutes of Health</a>&nbsp;|
            </li>
            <li>
              <a href="http://www.cancer.gov/" target="_blank">National Cancer Institute</a>&nbsp;|
            </li>
            <li class="last">
              <a href="http://usa.gov" target="_blank">USA.gov</a>
            </li><br>

            <br/>
            <li>
              Version {{ version }}
            </li>

          </ul>
        </div>
      </div>
    </div><!--back to top arrow-->
    <a class="back-to-top" href="#" style="display: none;">TOP</a>
  </footer>
</template>

<script>
/* eslint-disable indent */
  export default {
    computed: {
      version: function () {
        return this.$store.getters.version
      }
    }
  }
</script>
