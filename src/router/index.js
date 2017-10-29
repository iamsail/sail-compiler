import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import compiler from '@/components/compiler'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: header,
          components: {
              default:header,
              a:compiler
          }
      }
  ]
})
