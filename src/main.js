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

require('es6-promise').polyfill()

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/index', component: Index, name: 'index'},
  {path: '/justdo/:bCode', component: GateChange, name: 'gatechange'},
  {path: '/tools', component: Tools, name: 'tools'}
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
