/**
 * @file entry point
 */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/index.js'
import Tools from './components/Tools'
import Login from './components/Login'
import Index from './components/Index'
import GateChange from './components/GateChange'
import GateForAll from './components/GateChangeForAll'

require('es6-promise').polyfill()

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/index', component: Index, name: 'index'},
  {path: '/tools', component: Tools, name: 'tools'},
  {path: '/justdo/:a/:b/:c/:d', component: GateChange, name: 'gatechange'},
  {path: '/allchange', component: GateForAll, name: 'changeforall'}
]
const router = new VueRouter({
  routes
})
Vue.directive('transclude', {
  inserted: function inserted (el) {
    document.body.appendChild(el)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
