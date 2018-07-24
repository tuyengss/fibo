import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/modules/dashboard';
import Login from '@/modules/session/login';
import Profile from '@/modules/session/profile';
import Password from '@/modules/session/password';
import Sims from '@/modules/sims';
import Logs from '@/modules/logs';
import Retries from '@/modules/retries';

Vue.use(Router);
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/password',
      name: 'password',
      component: Password,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sims',
      name: 'Sims',
      component: Sims,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/retries',
      name: 'Retries',
      component: Retries,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let _token = window.localStorage.getItem('_token');
    if(!_token || _token == null || _token == 'null' || _token == ''){
      window.location.href = '#/login';
      window.location.reload();
    }else{
      next();
    }
  } else {
    next();
  }
})

export default router;
