import Vue from 'vue'
import App from './App.vue'

import router from '@/routers'
import './styles/index.less'
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('itcast_pro_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({
      name: 'Login'
    })
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
