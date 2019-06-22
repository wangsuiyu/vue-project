import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/users/welcome.vue'
import Users from '@/views/users/users.vue'
Vue.use(VueRouter)
Vue.use(ElementUI)

var router = new VueRouter({
  routes: [{
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: { name: 'Welcome' },
    children: [{
      name: 'Welcome',
      path: 'welcome',
      component: Welcome
    },
    {
      name: 'Users',
      path: 'users',
      component: Users
    }]
  }]
})

export default router
