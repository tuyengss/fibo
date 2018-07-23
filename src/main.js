// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en';
import BootstrapVue from 'bootstrap-vue';
import ElementUI from 'element-ui';
import axios from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import AuthApp from './AuthApp';
import router from './router';
import store from './store';

axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(Vuex);

const createApp = user => new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App: App
  }
});

const createAuthApp = user => new Vue({
  el: '#app',
  router,
  store,
  template: '<AuthApp/>',
  components: {
    AuthApp: AuthApp
  }
});

let _token = window.localStorage.getItem('_token');
if(_token && _token !== null && _token !== 'null'){
  const app = createApp();
}else{
  const authApp = createAuthApp();
}


