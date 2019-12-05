// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// var $ = require("jquery")
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(value).format('YYYY-MM-DD') // value可以是普通日期 20170723
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// console.log($, global, this)
