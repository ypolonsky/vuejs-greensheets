import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable semi */

export const store = new Vuex.Store({
  state: {
    user: 'Non-identified User',
    changedUser: null,
    tier: 'Development',
    version: '1.0.0.1112344',
    commentEmail: 'techsupport@nih.gov',
    developerRole: true,
    alertType: '',
    alertMessageHeader: '',
    alertMessage: '',
    // Storage for database configuration properties
    conf: null,
    // Search criteria for logged user
    searchCriteria: null
  },
  getters: {
    isAuthorized: (state) => {
      return (state.user != null && state.user !== '')
    },
    loggedUserName: state => {
      return (state.changedUser != null) ? state.changedUser.fullName : ((state.user.fullName === undefined) ? state.user : state.user.fullName)
    },
    loggedUser: state => {
      return (state.changedUser != null) ? state.changedUser : state.user
    },
    oracleId: state => {
      return (state.changedUser != null) ? state.changedUser.oracleId : ((state.user.oracleId === undefined) ? state.user : state.user.oracleId)
    },
    tier: (state) => {
      return state.tier
    },
    versionLabel: (state) => {
      return state.tier + ' | Ver.' + state.version
    },
    version: (state) => {
      let v = state.version.split('.')
      return v[0] + '.' + v[1] + '.' + v[2]
    },
    commentEmail: (state) => {
      return state.commentEmail
    },
    developerRole: (state) => {
      return state.developerRole
    },
    alertType: (state) => {
      return state.alertType
    },
    alertMessageHeader: (state) => {
      return state.alertMessageHeader
    },
    alertMessage: (state) => {
      return state.alertMessage
    },
    conf: state => {
      return state.conf
    },
    isProgramStaff: (state, getters) => {
      let user = getters.loggedUser;
      return user.roles !== undefined &&
        (user.roles.indexOf('PA') > -1 ||
        user.roles.indexOf('GTA') > -1 ||
        user.roles.indexOf('PROGASST') > -1 ||
        user.roles.indexOf('PROGSPEC') > -1)
    },
    isProgramDirector: (state, getters) => {
      let user = getters.loggedUser;
      return user.roles !== undefined && user.roles.indexOf('PD') > -1;
    },
    searchCriteria: state => {
      return state.searchCriteria;
    }
  },
  mutations: {
    updateUser: (state, newuser) => {
      state.user = newuser
    },
    updateChangedUser: (state, newuser) => {
      state.changedUser = newuser
    },
    updateAlert: (state, payload) => {
      state.alertType = payload.msgType
      state.alertMessageHeader = payload.msgHeader
      state.alertMessage = payload.msg
    },
    updateConf: (state, payload) => {
      state.conf = payload
    },
    updateSearchCriteria: (state, payload) => {
      state.searchCriteria = payload
    }
  }
})
