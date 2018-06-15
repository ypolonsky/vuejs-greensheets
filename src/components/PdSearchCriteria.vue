<template>
  <div>
    <form action="searchGrants" id="search-form" theme="simple">
      <!-- Begin Panel -->
      <div class="panel panel-default" style="margin-right: 15px; margin-left: 15px;">
        <div class="panel-heading">
          <span class="clickable" @click="showHideCriteria"><i class="fa" :class="showCriteriaClass" aria-hidden="true"></i></span>
          <div class="pheader" style="display:inline;"><h4>Search Criteria</h4></div>
        </div>
        <!--end panel header-->

        <div class="panel-body" v-show="showCriteria">
          <div class="row form-group" style="margin-top: 0px;">
            <div class="col-xs-4">
              <div>
                <label for="selectFrom">Grants from:</label>
                <select id="selectFrom" class="form-control" v-model="searchCriteria.searchType" @change="onGrantsFromSelect">
                  <option v-for="type in searchTypes" :value="type.value" :key="type.value">{{ type.text }}</option>
                </select>
              </div>

              <!-- Grant number definition -->
              <div id="GrantNumber">
                <span style="display:block; margin-top: 20px; margin-bottom: -5px; font-weight:bold;">Grant Number</span>
                <div class="form-group" style="margin-top: 10px;">
                  <div style="display:inline-block;" id="type">
                    <label class="grant-label" style="margin-left: 0px;" for="grantType">Type</label>
                    <input type="text" maxlength="1" v-model="searchCriteria.grantType" class="form-grant" style="width: 22px; border-color: rgb(204,204,204)" id="grantType" placeholder="1"/>
                  </div>
                  <div style="display:inline-block;">
                    <label class="grant-label" for="grantMech">Mech</label>
                    <input type="text" maxlength="3" v-model="searchCriteria.grantMech" class="form-grant" style="width: 40px;" id="grantMech" placeholder="R01"/>
                  </div>
                  <div style="display:inline-block;">
                    <label class="grant-label" for="grantIc">IC</label>
                    <input type="text" maxlength="2" v-model="searchCriteria.grantIc" class="form-grant" style="width: 36px;" id="grantIc" readonly="true"/>
                  </div>
                  <div style="display:inline-block;">
                    <label class="grant-label" for="grantSerial">Serial #</label>
                    <input type="text" maxlength="6" v-model="searchCriteria.grantSerial" class="form-grant" style="width: 60px;" id="grantSerial" placeholder="123456"/>
                  </div>
                  <div style="display:inline-block;">
                    <span class="grant-label" style="margin-left: 0px;">
                        &nbsp;
                    </span>
                    -&nbsp;
                  </div>
                  <div style="display:inline-block;">
                    <label class="grant-label" for="grantYear">Year</label>
                    <input type="text" maxlength="2" v-model="searchCriteria.grantYear" class="form-grant" style="width: 30px;" id="grantYear" placeholder="01"/>
                  </div>
                  <div style="display:inline-block;">
                    <label class="grant-label" for="grantSuffix">Suffix</label>
                    <input type="text" maxlength="4" v-model="searchCriteria.grantSuffix" class="form-grant" style="width: 55px;" id="grantSuffix"/>
                  </div>
                  <div style="display:inline-block; margin-left: 5px; margin-bottom: 2px; vertical-align:bottom;">
                    <a href="#" data-toggle="tooltip" data-placement="right" title="" id="clearG"
                       data-original-title="Clear Grant Number">
                      <img src="../assets/images/clearGrant.png" alt="Clear Grant Number" height="20px"
                           width="30px" id="clearGrant" style="margin-bottom: 3px;">
                      <img src="../assets/images/clearGrant-over.png" alt="Clear Grant Number" height="20px"
                           width="30px" id="clearGrantOver" style="display:none; margin-bottom: 3px;"></a>
                  </div>
                  <div id="helpText"></div>
                </div>
              </div>
              <!-- end of Grant number definition -->
            </div>

            <div class="col-xs-4">
              <label for="activities">Cancer Activity(ies):</label>
              <div id="cancer-activities">
                <select id="activities" data-placeholder="Select Cancer Activity(ies)"
                        v-model="searchCriteria.cancerActivities" multiple="true"
                        v-chosen="searchCriteria.cancerActivities" class="form-control" style="width: 100%">
                  <option v-for="option in cancerActivities" :value="option" :key="option">{{ option }}</option>
                </select>
              </div>

              <div style="margin-top: 40px;">
                <label for="fy">Fiscal Year:</label>
                <input type="text" maxlength="4" id="fy" v-model="searchCriteria.fiscalYear" class="form-control"/>
              </div>
            </div>

            <div class="col-xs-4">
              <label for="mechanisms">Mechanism(s):</label>
              <select id="mechanisms" data-placeholder="Select Mechanism(s)"
                      v-model="searchCriteria.mechanisms" multiple="true"
                      v-chosen="searchCriteria.mechanisms" style="width: 188px" class="form-control chosen-select">
                <option v-for="option in mechanisms" :value="option" :key="option">{{ option }}</option>
              </select>
              <span style="color:#999; font-weight:bold; font-size: 14px;">&nbsp;&nbsp;<i>Leaving Mechanism blank will return all Mechanisms</i></span>

              <div class="checkbox" style="margin-top: 3px; margin-left: 8px; padding-left: 0px; clear:both;"
                   id="competingGrants">
                <label for="competingGrants" style="font-size: 14px;">
                  <input type="checkbox" v-model="searchCriteria.withinPayline" id="payline"/>
                  Show Competing Grants within Payline</label>
              </div>
              <div class="checkbox"
                   style="margin-top: -12px; margin-left: 8px; padding-left: 0px; clear:both;"
                   id="nonCompetingGrants">
                <label for="nonCompeting" style="font-size: 14px;">
                  <input type="checkbox" v-model="searchCriteria.nonCompeting" id="nonCompeting"/>
                  Show Non-competing Grants</label>
              </div>
              <div class="checkbox"
                   style="margin-top: -12px; margin-left: 8px; padding-left: 0px; clear:both;"
                   id="competingOutOfPayline">
                <label for="competingOutside" style="font-size: 14px;">
                  <input type="checkbox" v-model="searchCriteria.competingOutOfPayline" id="competingOutside"/>
                  Show Competing Grants outside Payline</label>
              </div>
            </div>
          </div><!--end form group row -->

          <div class="form-group row" style="display: flex; align-items: flex-end">

            <div class="col-xs-4">
              <label class="form-check-label" for="search_criteria_piname">
                PI Name
              </label>
              <input type="text" maxlength="120" v-model="searchCriteria.piName" id="search_criteria_piname"
                           class="form-control" placeholder="Enter PI Name"/>
            </div>
            <div class="col-xs-4">
              <label class="form-check-label" for="search_criteria_pdname">
                PD Name
              </label>
              <select class="form-control" label="Select PD Name" v-model="searchCriteria.pdName" id="search_criteria_pdname">
                <option v-for="option in activePdNames" :key="option.value">{{ option.text }}</option>
                <!--<s:optgroup label="Active PDs" list="activePdNames"/>-->
                <!--<s:optgroup label="Inactive PDs" list="inactivePdNames"/>-->
              </select>
            </div>

            <div class="col-xs-4 searchButton" id="searchDiv" style="margin-right: -15px; margin-bottom: 0px;">
              <button type="button" class="btn btn-primary has-spinner" id="search-btn" style="float:right; margin-top: 20px;" @click="$emit('clicked-search-criteria', searchCriteria)">
                Search
              </button>

              <button id="clear_search" class="btn btn-default" type="submit" style="float: right; margin-top: 20px;">
                Reset to Default Search
              </button>
            </div>
          </div><!--end form group row -->
        </div><!-- end panel body -->
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
import Multiselect from 'vue-multiselect'
import axios from 'axios'

    export default {
      name: 'PdSearchCriteria',
      data () {
        return {
          searchCriteria: {
            searchType: null,
            cancerActivities: [],
            mechanisms: []
          },
          searchTypes: [],
          cancerActivities: [],
          allCancerActivities: [],
          mechanisms: [],
          activePdNames: [],
          showCriteria: true,
          showCriteriaClass: 'fa-minus-circle'
        };
      },
      components: { Multiselect },
      methods: {
        showHideCriteria () {
          this.showCriteria = !this.showCriteria;
          this.showCriteriaClass = (this.showCriteria) ? 'fa-minus-circle' : 'fa-plus-circle'
        },
        onGrantsFromSelect () {
          console.log('On GrantFrom select ' + this.searchCriteria.searchType);
          if (this.searchCriteria.searchType === 'MY_PORTFOLIO') {
            this.cancerActivities = this.$store.getters.loggedUser.pca
          } else if (this.searchCriteria.searchType === 'MY_CANCER_ACTIVITY') {
            this.cancerActivities = this.$store.getters.loggedUser.ca
          } else {
            this.cancerActivities = this.allCancerActivities
          }
        },
        getCurrentFiscalYear () {
          let today = new Date();
          let fy = today.getFullYear();
          if ((today.getMonth() + 1) >= 10) { // October
            fy++;
          }
          return fy;
        }
      },
      beforeMount () {
        console.log('PdSearchCriteria: before mount');
        let storeSC = this.$store.getters.searchCriteria;

        // INITIALIZE Search Criteria for logged user
        if (storeSC === undefined || storeSC === null) {
          console.log('before mount: searchCriteria is empty');
          storeSC = {};
          if (this.$store.getters.isProgramDirector) {
            storeSC.searchType = 'MY_PORTFOLIO';
          } else if (this.$store.getters.isProgramStaff) {
            storeSC.searchType = 'MY_CANCER_ACTIVITY';
          } else {
            storeSC.searchType = 'ALL_NCI_GRANTS';
          }
          storeSC.cancerActivities = [];
          storeSC.mechanisms = [];
          storeSC.grantIc = 'CA';
          storeSC.fiscalYear = this.getCurrentFiscalYear();
          storeSC.currentFiscalYear = this.getCurrentFiscalYear();
          storeSC.minorityFlag = false;
          storeSC.withinPayline = true;
          storeSC.nonCompeting = true;
          storeSC.competingOutOfPayline = false;

          this.$store.commit('updateSearchCriteria', storeSC);
        }
        this.searchCriteria = storeSC;

        if (this.$store.getters.isProgramDirector) {
          this.searchTypes = [
            {
              value: 'MY_PORTFOLIO',
              text: 'My Portfolio'
            },
            {
              value: 'MY_CANCER_ACTIVITY',
              text: 'My Cancer Activity (' + this.$store.getters.loggedUser.ca.toString() + ')'
            },
            {
              value: 'ALL_NCI_GRANTS',
              text: 'All NCI Grants'
            }
          ];
        } else { // TODO - should be check against program staff
          this.searchTypes = [
            {
              value: 'MY_CANCER_ACTIVITY',
              text: 'My Cancer Activity (' + this.$store.getters.loggedUser.ca.toString() + ')'
            },
            {
              value: 'ALL_NCI_GRANTS',
              text: 'All NCI Grants'
            }
          ]
        }
        // reset the selected value
        this.searchCriteria.searchType = this.$store.getters.searchCriteria.searchType;

        axios.get(this.$i18n.t('url.allCancerActivities', { host: window.webapihost })).then(response => {
          console.log('Invoked allCancerActivities - done');
          console.log(response.data);
          this.allCancerActivities = response.data.data;
          console.log('Received ' + this.allCancerActivities.length + ' cancer activities');
          this.onGrantsFromSelect();
          this.searchCriteria.cancerActivities = this.$store.getters.searchCriteria.cancerActivities;
        }).catch((error) => {
          console.log('Cannot access URL allCancerActivities.json!' + error);
        })

        axios.get(this.$i18n.t('url.allMechanisms', { host: window.webapihost })).then(response => {
          console.log('Invoked allMechanisms - done');
          console.log(response.data);
          this.mechanisms = response.data.data;
          console.log('Received ' + this.mechanisms.length + ' mechanisms');
          this.searchCriteria.mechanisms = this.$store.getters.searchCriteria.mechanisms;
        }).catch((error) => {
          console.log('Cannot access URL allCancerActivities.json!' + error);
        })
        console.log('before mount: searchCriteria.withinPayline = ' + this.searchCriteria.withinPayline);
      },
      mounted () {
        if (this.$store.getters.isProgramDirector) {
          console.log('Auto search for program director');
          this.$emit('clicked-search-criteria', this.$store.getters.searchCriteria);
        }
      }
    }
</script>

<style scoped>
  .panel-default>.panel-heading,.panel-default>.panel-body  {
    background-color: #e3e3e3;
  }

  .panel-default>.panel-body {
    border-top: solid thin;
    border-top-color: black;
  }

  .panel-default>.panel-body .btn-default {
    color: #000000;
    background-color: #FFFFFF;
    border-color: #ccc;
  }

  .panel-default>.panel-body .btn-default:hover {
    color: #fff;
    background-color: #999;
    border-color: #adadad;
  }
  .grant-label {
    font-size: 14px;
    margin-left: 3px;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .btn {
    margin-right: 5px;
  }

  .form-grant {
    display: block;
    margin-left: 0;
    /* height: 34px; */
    padding: 3px 6px;
    /* line-height: 1.42857143; */
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -moz-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
</style>
