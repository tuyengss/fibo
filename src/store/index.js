import Vue from 'vue';
import Vuex from 'vuex';

import dashboard from '@/modules/dashboard/store';
import session from '@/modules/session/store';
import logs from '@/modules/logs/store';
import sims from '@/modules/sims/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    dashboard,
    logs,
    sims,
  }
});
