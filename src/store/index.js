import Vue from 'vue';
import Vuex from 'vuex';
import VueSwal from 'vue-swal'

import dashboard from '@/modules/dashboard/store';
import session from '@/modules/session/store';
import logs from '@/modules/logs/store';
import sims from '@/modules/sims/store';
import retries from '@/modules/retries/store';

Vue.use(Vuex);
Vue.use(VueSwal);

export default new Vuex.Store({
  modules: {
    session,
    dashboard,
    logs,
    sims,
    retries
  }
});
