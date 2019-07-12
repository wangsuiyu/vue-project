import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/users/welcome.vue'
import Users from '@/views/users/users.vue'
import Right from '@/views/rights/right.vue'
import Roles from '@/views/rights/roles.vue'
import Goods from '@/views/goods/goods.vue'
import List from '@/views/goods/list.vue'
import Add from '@/views/goods/add.vue'
Vue.use(VueRouter)
Vue.use(ElementUI)

var router = new VueRouter({
  routes: [{
    name: 'default',
    path: '/',
    redirect: { name: 'Login' }
  }, {
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
    },
    {
      name: 'Right',
      path: 'rights',
      component: Right
    },
    {
      name: 'Roles',
      path: 'roles',
      component: Roles
    },
    {
      name: 'Goods',
      path: 'goods',
      component: Goods,
      redirect: { name: 'List' },
      children: [
        {
          name: 'List',
          path: 'list',
          component: List
        },
        {
          name: 'Add',
          path: 'add',
          component: Add
        }
      ]
    }]
  }]
})
// router.beforeEach((to, from, next) => {
//   var token = localStorage.getItem('itcast_pro_token')
//   if (token) {
//     next()
//   } else {
//     if (to.path !== '/login') {
//       next({
//         path: '/login'
//       })
//     } else {
//       next()
//     }
//   }
// })
export default router
