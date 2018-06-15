/* eslint-disable semi */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import jquery from 'jquery'
import router from './router/routes'
import { store } from './store/store'
import axios from 'axios'
import 'bootstrap'
import '../node_modules/chosen-js/chosen.jquery'
import Autocomplete from 'v-autocomplete'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import { messages } from './assets/i18n'

// import 'v-autocomplete/dist/v-autocomplete.css'
window.webapihost = window.location.protocol + '//' + window.location.hostname;

Vue.use(Autocomplete)
Vue.use(VeeValidate)
Vue.use(VueI18n)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en',
  messages
})

/* eslint-disable no-new */
/* eslint-disable no-undef */

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  console.log('Routing to: ', to.name);
  console.log('Configuration: ', store.getters.conf);

  if (to.name === 'NotAuthorized' || to.name === 'showAlert') {
    next();
  } else if (store.getters.conf === null) {
    console.log('Host: ' + window.location.hostname);
    console.log('Path: ' + window.location.origin);
    axios.get(i18n.t('url.reload', { host: window.webapihost }), {params: { appname: 'CHANGEPASSWORD' }}).then(response => {
      console.log('Done with url.reload');
      store.commit('updateConf', response.data.conf);

      // Get the user information if first call succeed
      axios.get(i18n.t('url.userInfo', { host: window.webapihost })).then(response => {
        console.log('Done with url.userInfo');
        console.log(response.data);
        store.commit('updateUser', response.data.user);
        store.commit('updateChangedUser', response.data.changedUser);
        store.commit('updateSearchCriteria', null);
        next();
      }).catch((error) => {
        console.log('Cannot access URL user.json!' + error);
        store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: i18n.t('error.failedToAuthorized', { error: error, email: 'techsupport@nih.gov' }) });
        next('/alert');
      })
    }).catch((error) => {
      console.log('Cannot access URL user.json!' + error);
      store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: i18n.t('error.failedToReload', { error: error, email: 'techsupport@nih.gov' }) });
      next('/alert');
    })
  } else {
    // Get the user information if we don't do the first call
    axios.get(i18n.t('url.userInfo', { host: window.webapihost })).then(response => {
      console.log(response.data);
      store.commit('updateUser', response.data.user);
      store.commit('updateChangedUser', response.data.changedUser);
      next();
    }).catch((error) => {
      console.log('Cannot access URL user.json!' + error);
      // store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: 'Authorization failed - ' + error + '<br/>Contact <a href="mailto:techsupport@nih.gov?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.' });
      store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: i18n.t('error.failedToAuthorized', { error: error, email: 'techsupport@nih.gov' }) });
      next('/alert');
    })
    // if (!store.getters.isAuthorized) {
    //   console.log('global is Authorized');
    //   next();
    // } else {
    //   console.log('global is NOT Authorized');
    //   next('/notuser');
    // }
  }
  // if (!store.getters.isAuthorized) {
  //   // next('/notuser');
  //   next();
  // }
  // next('/notuser');
  // next();
});

Vue.directive('chosen', {
  inserted: function (el, binding, vnode) {
    jquery(el).chosen().change(function (event, change) {
      if (Array.isArray(binding.value)) {
        var selected = binding.value;
        if (change.hasOwnProperty('selected')) {
          selected.push(change.selected);
        } else {
          selected.splice(selected.indexOf(change.deselected), 1);
        }
      } else {
        var keys = binding.expression.split('.');
        var pointer = vnode.context;
        while (keys.length > 1) {
          pointer = pointer[keys.shift()];
        }
        pointer[keys[0]] = change.selected;
      }
    });
  },
  componentUpdated: function (el, binding) {
    jquery(el).trigger('chosen:updated');
  }
});

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
