import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Body from '../components/Body.vue'
import NotAuthorized from '../components/NotAuthorized.vue'
import Alert from '../components/Alert.vue'
import PdSearch from '../components/PdSearchResults.vue'
import Greensheet from '../components/Grensheet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vv/', // only for development
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      components: {
        default: Body,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/notuser',
      name: 'NotAuthorized',
      components: {
        default: NotAuthorized,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/alert',
      name: 'showAlert',
      components: {
        default: Alert,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/pdsearch',
      name: 'Program Search',
      components: {
        default: PdSearch,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/greensheet/:applId/:type',
      name: 'View Greensheet',
      components: {
        default: Greensheet,
        header: Header,
        footer: Footer
      },
      props: {
        default: true,
        header: false,
        footer: false
      }
    }
  ]
})
