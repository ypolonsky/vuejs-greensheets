<template>
<div class="col-md-12">
  <pd-search-criteria @clicked-search-criteria="startSearch" @reset-search-results="resetSearch"></pd-search-criteria>
  <div class="col-md-12">
    <table>
      <tr>
        <td colspan="2" style="padding: 3px;"><strong>Legend:</strong></td>
        <td style="padding: 3px;"><img src="../assets/images/thumbsup.gif" alt="OGA is waiting for Submission"
                                       name="thumbs" height="18" border="0" width="24"></td>
        <td style="font-size: 12px;">OGA is waiting for Submission</td>
        <td style="padding: 3px;"><img src="../assets/images/asterisk.gif" alt="Can be Submitted" name="asterisk"
                                       height="18" border="0" width="24"></td>
        <td style="font-size: 12px;">Can be Submitted</td>
      </tr>
    </table>
    <br/>
  </div>
  <div class="col-md-12">
    <ag-grid-vue id="pdgrid" style="width: 100%;" class="ag-theme-balham"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :showToolPanel="showToolPanel"
                 :enableColResize="true"
                 :enableSorting="true"
                 :enableFilter="false"
                 :groupHeaders="true"
                 :suppressRowClickSelection="true"
                 :toolPanelSuppressGroups="true"
                 :toolPanelSuppressValues="true"
                 headerHeight="36"
                 rowSelection="multiple"
    >
    </ag-grid-vue>
  </div>
</div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
import {AgGridVue} from 'ag-grid-vue'
import axios from 'axios'
import moment from 'moment'
// import VueRouter from 'vue-router'
import PrgGsIconRenderer from './PgmGsIconRenderer.vue'
import PdSearchCriteria from '../components/PdSearchCriteria.vue'
import GsmGsIconRenderer from './GmsGsIconRenderer.vue'

// const router = new VueRouter();

  export default {
    data () {
      return {
        searchCriteria: null,
        gridOptions: [],
        columnDefs: [],
        showGrid: true,
        showToolPanel: false,
        proceedGetRows: false
      }
    },
    components: {
      'ag-grid-vue': AgGridVue,
      'pd-search-criteria': PdSearchCriteria
      // 'prg-icon-vue': {
      //   router,
      //   template: '<router-link to="/greensheet/123/PGM">PGM</router-link>'
      // }
    },
    methods: {
      createHeader () {
        this.columnDefs = [
          {
            field: 'pgs', headerName: 'Pgm GS', width: 110, cellRendererFramework: PrgGsIconRenderer, editable: true
          },
          {
            field: 'pstatus', headerName: 'Pgm GS<br/>Status', width: 110, headerClass: 'twoRowHeader'
          },
          {
            field: 'numDays', headerName: '# of Days<br/>with_OGA', width: 110, headerClass: 'twoRowHeader'
          },
          {
            field: 'grant', headerName: 'Grant Number', width: 150
          },
          {
            field: 'pi', headerName: 'PI', width: 150
          },
          {
            field: 'pd', headerName: 'PD', width: 150
          },
          {
            field: 'ca', headerName: 'CA', width: 80
          },
          {
            field: 'bstart', headerName: 'Budget<br/>Start Date', width: 150, headerClass: 'twoRowHeader', valueFormatter: this.dateFormatter
          },
          {
            field: 'priscr', headerName: 'PriScr', width: 100
          },
          {
            field: 'pctl', headerName: 'Pctl', width: 100
          },
          {
            field: 'ncab', headerName: 'NCAB', width: 100, valueFormatter: this.ncabFormatter
          },
          {
            field: 'sgs', headerName: 'GMS GS', width: 90, cellRendererFramework: GsmGsIconRenderer, editable: true
          },
          {
            field: 'sstatus', headerName: 'GMS GS<br/>Status', width: 110, headerClass: 'twoRowHeader'
          }
        ]
      },
      resetSearch () {
        console.log('Reset Search results');
        if (this.gridOptions && this.gridOptions.api) {
          this.gridOptions.api.setInfiniteRowCount(0, true)
        }
      },
      startSearch (criteria) {
        console.log('Start Search with parameters: ' + criteria.searchType + ',' + criteria.cancerActivities + ',' + criteria.mechanisms + ',' + criteria.grantType + ',' + criteria.grantMech + ',' + criteria.grantIc);
        this.searchCriteria = criteria;
        this.$store.commit('updateSearchCriteria', criteria);
        if (this.gridOptions && this.gridOptions.api) {
          var maxCount = this.gridOptions.api.getInfiniteRowCount()
          console.log('Infinite Row Count = ' + maxCount)
          this.gridOptions.api.setInfiniteRowCount(1, false)
          this.gridOptions.api.purgeInfiniteCache();
          console.log('selector: ' + document.querySelector('#pdgrid').style.height);
          console.log('domlayout: ' + this.gridOptions.domLayout);
        }
      },
      isAdditionalFilter () {
        return this.$store.getters.isProgramDirector && this.searchCriteria.fiscalYear === this.searchCriteria.currentFiscalYear && this.searchCriteria.searchType === 'MY_PORTFOLIO'
      },
      isSearchByGrantNumber () {
        return (this.searchCriteria.grantType || this.searchCriteria.grantMech || this.searchCriteria.grantSerial || this.searchCriteria.grantYear || this.searchCriteria.grantSuffix);
      },
      ncabFormatter (params) {
        if (!params.value) {
          return '';
        }
        console.log('NCAB=' + params.value)
        var month = params.value.substring(4)
        if (month === '00') {
          return '';
        }
        console.log('month=' + month)
        var year = params.value.substring(0, 4)
        console.log('year=' + year)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[month - 1] + ' ' + year;
      },
      dateFormatter (params) {
        if (!params.value) {
          return '';
        }
        return moment(params.value).format('MM/DD/YYYY')
      },
      openGreensheet (applId, type) {
        console.log('Attempt to open ' + applId + '/' + type);
        this.$router.push({ name: 'View Greensheet', params: { applId: applId, type: type } });
      }
    },
    beforeMount () {
      console.log('Program Search : beforeMount()');
      this.createHeader();
      var self = this;
      var datasource = {
        getRows: (params) => {
          self.gridOptions.api.hideOverlay(); // hide "no rows" message if any
          console.log('asking for ' + params.startRow + ' to ' + params.endRow);
          // TODO - find out why ag-grid initializes data twice
          if (params.context != null && (self.proceedGetRows === undefined || !self.proceedGetRows)) {
            self.proceedGetRows = true;
            console.log('skip initial rows retrieval!');
            params.successCallback([], 0);
            return;
          }
          if (self.searchCriteria === undefined || self.searchCriteria === null) {
            self.proceedGetRows = true;
            console.log('No Search Criteria Specified to getRows()');
            params.successCallback([], 0);
            return;
          }

          axios.post(self.$i18n.t('url.searchGrants', { host: window.webapihost }),
            {
              oracleId: self.$store.getters.oracleId,
              fiscalYear: (self.searchCriteria.fiscalYear) ? self.searchCriteria.fiscalYear : '',
              searchType: self.searchCriteria.searchType,
              cancerActivities: (self.searchCriteria.cancerActivities) ? self.searchCriteria.cancerActivities : [],
              mechanisms: (self.searchCriteria.mechanisms) ? self.searchCriteria.mechanisms : [],
              grantType: (self.searchCriteria.grantType) ? self.searchCriteria.grantType : '',
              grantMech: (self.searchCriteria.grantMech) ? self.searchCriteria.grantMech : '',
              grantIc: (self.searchCriteria.grantIc) ? self.searchCriteria.grantIc : 'CA',
              grantSerial: (self.searchCriteria.grantSerial) ? self.searchCriteria.grantSerial : '',
              grantYear: (self.searchCriteria.grantYear) ? self.searchCriteria.grantYear : '',
              grantSuffix: (self.searchCriteria.grantSuffix) ? self.searchCriteria.grantSuffix : '',
              withinPayline: (self.searchCriteria.withinPayline) ? self.searchCriteria.withinPayline : 'false',
              nonCompeting: (self.searchCriteria.nonCompeting) ? self.searchCriteria.nonCompeting : 'false',
              competingOutOfPayline: (self.searchCriteria.competingOutOfPayline) ? self.searchCriteria.competingOutOfPayline : 'false',
              portfolioIds: (self.$store.getters.loggedUser.npeId) ? self.$store.getters.loggedUser.npeId : [],
              searchImpacIIStatuses: self.isAdditionalFilter(),
              filterCancelled: self.isAdditionalFilter() || !self.isSearchByGrantNumber(),
              filterBudgetPeriod: self.isAdditionalFilter(),
              startMonth: (self.$store.getters.conf.FY_START_MONTH) ? self.$store.getters.conf.FY_START_MONTH : 10,
              startDay: (self.$store.getters.conf.FY_START_DAY) ? self.$store.getters.conf.FY_START_DAY : 1,
              pdFormStatuses: self.isAdditionalFilter() ? ['NOT STARTED', 'SAVED', 'UNSUBMITTED'] : [],
              start: params.startRow,
              length: params.endRow - params.startRow,
              sortProperties: params.sortModel
            }).then(response => {
            console.log(response.data);
            console.log('calling callback with  ' + response.data.grants.length + ' rows');
            if (response.data.grants.length === 0) {
              self.gridOptions.api.showNoRowsOverlay();
            } else {
              self.gridOptions.api.hideOverlay();
            }
            params.successCallback(response.data.grants, response.data.total);
          });
        }
      };
      this.gridOptions = {
        context: this,
        enableServerSideSorting: true,
        rowModelType: 'infinite',
        infiniteInitialRowCount: 1,
        maxConcurrentDatasourceRequests: 2,
        pagination: true,
        paginationPageSize: 25,
        gridAutoHeight: true,
        getRowNodeId: function (item) {
          return item.applId;
        },
        datasource: datasource
      };
    }
  }
</script>

<style>
  .ag-cell {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .ag-cell:hover {
    overflow: visible;
  }
  .ag-theme-balham .ag-header-cell.twoRowHeader {
    line-height: normal;
  }
  .ag-cell-focus,.ag-cell-no-focus{
    border:none !important;
  }
  .ag-cell:focus{
    border:none !important;
    outline: none;
  }
</style>
