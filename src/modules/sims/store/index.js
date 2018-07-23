import { GET_ALL_SIMS, CHANGE_LOADING_STATUS, GET_ALL_TELCOS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
  fullLoading: false,
  sims: [],
  telcos: []
};

const mutations = {
  [GET_ALL_SIMS](state, sims) {
    state.sims.splice(0);
    state.sims = [...sims];
  },

  [GET_ALL_TELCOS](state, telcos) {
    state.telcos.splice(0);
    state.telcos = [...telcos];
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
