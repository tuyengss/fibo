import { ADD_MESSAGE, SET_USER, SEARCH, LOGIN, LOGOUT,CHECKLOGIN, GET_PROFILE,CHANGE_LOADING_STATUS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
  user: null,
  messages: [],
  searchText: '',
  screens: [],
  profile:[],
};

const mutations = {
  [ADD_MESSAGE](state, item) {
    state.messages.splice(0);
    state.messages.push(item);
  },

  [SET_USER](state, user) {
    state.user = user;
  },

  [SEARCH](state, text) {
    state.searchText = text;
  },

  [LOGIN](state, credentials) {
    const { username, password } = credentials;

  },

  [LOGOUT]() {
    window.localStorage.setItem('_token', null);
    window.location.href = '#/login';
    window.location.reload();
  },

  [GET_PROFILE](state, profile) {
    state.profile = profile;
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
