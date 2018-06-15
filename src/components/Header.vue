<template>
  <div class="navbar">
    <div class="row header headerbg">
      <div class="brandwrap">
        <div id="logo" class="logoImage">
          <img src="../assets/images/logo.png" width="275px;" alt="National Cancer Institute">
          <div class="versionControlLabel" style="float: right;" v-if='!production'>
            {{ versionLabel }}
          </div>
        </div>
      </div>
      <!-- Fixed navbar -->
      <div class="row">
        <!--Page Header -->
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" id="pageHeader">
          <div class="appBrand">
            <div class="titleWrapper mainLinks" style="margin-left: -3px; display: inline-block;">
              <a :href="workbenchUrl" target="_blank">Workbench  |</a> <h3> Change Your I2E and Data Mart Password</h3>
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 nav notify-row pull-right" id="top_menu">
          <ul class="nav top-menu">
            <li class="dropdown">
              <span class="changeUser"> Welcome: {{ user }}</span>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i aria-hidden="true" class="fa fa-question-circle"></i>&nbsp;Help </a>
              <ul class="dropdown-menu extended tasks-bar" style="width: 230px !important; left: -150px !important;">
                <li>
                  <p>
                    <a :href="'mailto:' + commentEmail + '?subject=Change Your I2E and Data Mart Password'">Technical Support </a>
                  </p>
                </li>
              </ul><!-- dropdown ends-->
            </li>
            <li class="dropdown" v-if="developerRole">
              <a id="menuChangeUser" ref="menuChangeUser" class="dropdown-toggle" data-toggle="dropdown" href="#"><i aria-hidden="true" class="fa fa-user"></i> Change User</a>
              <ul class="dropdown-menu extended tasks-bar" id="changeUser" href="#">
                <li>
                  <!--<form action="#" class="form-vertical" method="get">-->
                    <div class="row-fluid">
                      <div class="span4">
                        <div class="form-group ui-widget">
                          <v-autocomplete :items="users" v-model="changedUser" :get-label="getLabel" :min-len="2"
                                          :component-item="autocompleteItem"
                                          @update-items="updateItems" :input-attrs="{class: 'form-control', placeholder: 'Enter First or Last Name'}"
                                          @item-clicked="itemClicked" @item-selected="userChanged"
                                          :auto-select-one-item="false"></v-autocomplete>
                        </div>
                      </div>
                    </div>
                  <!--</form>-->
                </li>
              </ul>
              </li>
          </ul>
        </div><!-- end of top Menu -->
      </div><!-- end of row -->
    </div> <!-- end row header -->
  </div> <!-- end navbar -->
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
import axios from 'axios'
import autocompleteItem from './AutocompleteUser'
import { store } from '../store/store'
import jquery from 'jquery'

  export default {
    data () {
      return {
        changedUser: null,
        users: [],
        autocompleteItem: autocompleteItem
      }
    },
    methods: {
      updateItems (text) {
        // TODO - we will never get short text - find another solution
        if (text.length < 2) {
          console.log('text is too short' + text);
          this.users = [];
        } else {
          axios.get(this.$i18n.t('url.searchUser', { host: window.webapihost }), {params: {term: text}}).then(response => {
            console.log(response.data);
            this.users = response.data.result;
          })
        }
      },
      getLabel (item) {
        if (item !== null) {
          return item.label;
        }
        return '';
      },
      itemClicked (item) {
        console.log('Clicked item:', item);
        // this.changedUser = item;
      },
      userChanged (item) {
        console.log('Changing user to ' + item.nihNetworkId);
        axios.get(this.$i18n.t('url.userInfo', { host: window.webapihost }), {params: {changeUser: item.nihNetworkId}}).then(response => {
          console.log('from' + response.data.user.nihNetworkId + ' to ' + response.data.changedUser.nihNetworkId);
          store.commit('updateUser', response.data.user);
          store.commit('updateChangedUser', response.data.changedUser);
          store.commit('updateSearchCriteria', null);
          console.log('userChanged() refs.menuChangeUser after change user: ', this.$refs.menuChangeUser);
          if (this.$refs.menuChangeUser.getAttribute('aria-expanded') !== 'false') {
            console.log('userChanged()  - toggle dropdown');
            jquery(this.$refs.menuChangeUser).dropdown('toggle');
            jquery.post()
          }
          this.changedUser = '';
          this.users = [];
          this.$router.go('/pdsearch');
        }).catch(() => {
          console.log('Cannot access URL! change user');
        })
        console.log('Selected item:', item);
      }
    },
    computed: {
      user: function () {
        console.log('user - ' + this.$store)
        return this.$store.getters.loggedUserName
      },
      production: function () {
        console.log('production - ' + this.$store.getters.tier)
        let t = this.$store.getters.tier.toLowerCase()
        return t.startsWith('prod')
      },
      versionLabel: function () {
        console.log('versionLabel - ' + this.$store)
        return this.$store.getters.versionLabel
      },
      workbenchUrl: function () {
        return (this.$store.getters.conf) ? this.$store.getters.conf.URL_WORKBENCH : ''
      },
      commentEmail: function () {
        return this.$store.getters.commentEmail
      },
      developerRole: function () {
        return this.$store.getters.developerRole
      }
    }
  }
</script>

<style>
  div#top_menu.nav.notify-row.pull-right {
    margin-top: 0;
  }
  li.dropdown {
    float: left;
  }
  input.input-block-level.user-search {
    width: 190px;
  }
  .mainLinks h3 {
    color: #fff;
  }
  /* Header related customization */
  /* overlay styles, all needed */
  .overlay:after {
    content: "";
    display: block;
    position: fixed; /* could also be absolute */
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,0.5);
  }
  .ui-autocomplete {
    z-index: 10000;
  }
  .nav>li:hover {
    background-color: transparent;
  }
  .dropdown-menu.extended li a{
    font-size: 16px;
  }
  .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item.v-autocomplete-item-active {
    background-color: #DDD;
  }
  .v-autocomplete-list {
    display: block;
    width: 290px;
    margin-top: 2px;
    list-style: none;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    z-index: 10000;
  }
  .v-autocomplete-list-item {
    padding: 3px 20px;
    box-sizing: border-box;
    cursor: default;
    list-style: none;
    font-size: 16px;
    font-family: 'Source Sans Pro';
    font-weight: normal;
  }  </style>
