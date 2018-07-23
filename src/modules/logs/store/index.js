import { GET_ALL_LOGS, CHANGE_LOADING_STATUS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
  fullLoading: false,
  logs: [],
};

const mutations = {
  [GET_ALL_LOGS](state, logs) {
    state.logs.splice(0);
    state.logs = [...logs];
  },

  [CHANGE_LOADING_STATUS](state, flag) {
    state.fullLoading = flag;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
