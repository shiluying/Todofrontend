import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
// 配置路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
