import { GET_ALL_RETRIES, CHANGE_LOADING_STATUS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
  fullLoading: false,
  retries: [],
};

const mutations = {
  [GET_ALL_RETRIES](state, retries) {
    state.retries.splice(0);
    state.retries = [...retries];
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
