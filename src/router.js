import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          // path:'/home/comment',
          path: 'comment',
          component: () => import('./views/comment')
        },
        {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'articles',
          component: () => import('./views/articles')
        },
        {
          path: 'publish',
          component: () => import('./views/publish')
        },
        {
          path: 'publish/:articleId',
          component: () => import('./views/publish')

        },
        {
          path: 'account',
          component: () => import('./views/account')

        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
