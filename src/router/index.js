import Vue from 'vue'
import Router from 'vue-router'
import YiQing from '@/components/YiQing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'YiQing',
      component: YiQing
    }
  ]
})
