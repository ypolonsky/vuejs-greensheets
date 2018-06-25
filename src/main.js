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
  console.log('Routing from: ' + from.name + ' to: ' + to.name);
  console.log('Configuration: ', store.getters.conf);

  if (to.name === 'NotAuthorized' || to.name === 'showAlert') {
    next();
  } else if (store.getters.conf === null) {
    // Load application configuration if it has not been loaded
    console.log('Load configuration: host: ' + window.location.hostname + ' path: ' + window.location.origin);
    axios.get(i18n.t('url.reload', { host: window.webapihost }), {params: { appname: 'CHANGEPASSWORD' }}).then(response => {
      console.log('Done with url.reload');
      store.commit('updateConf', response.data.conf);

      // Get the user information if load configuration succeed
      axios.get(i18n.t('url.userInfo', { host: window.webapihost })).then(response => {
        console.log('Done with url.userInfo');
        console.log('Loaded user info: ' + response.data);
        var user = { loggedUser: response.data.user, changedUser: response.data.changedUser }
        store.commit('updateSearchCriteria', null);
        store.commit('updateUser', user);
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
    next();
  }
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
