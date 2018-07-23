import { ADD_MESSAGE, SEARCH, LOGIN, LOGOUT, GET_PROFILE, CHANGE_LOADING_STATUS } from './types';
import axios from 'axios';
import Service from '../../../core/service';
import toastr from '../../../core/toastr';
const service = new Service();

export const addMessage = ({ commit }, item) => {
  commit(ADD_MESSAGE, item);
};

export const searching = ({ commit }, text) => {
  commit(SEARCH, text);
};

export const login = ({ commit }, params) => {
  commit(LOGIN, params);
  commit(CHANGE_LOADING_STATUS, true);
  service.post('admin/login', params).then(({ data }) => {
      if (data.status === 'F') {
        toastr.error('Sai tên đăng nhập hoặc mật khẩu');
      }
      if (data.status === 'T') {
        window.localStorage.setItem('_token', data._id);
        window.location.href = '#/';
        window.location.reload();
      }
      commit(CHANGE_LOADING_STATUS, false);
    })
    .catch(err => {
      toastr.error(err);
      commit(CHANGE_LOADING_STATUS, false);
    });
};

export const checkLogin = () => {
  console.log('check');
  let _token = window.localStorage.getItem('_token');
  if (!_token || _token == null || _token == 'null' || _token == '') {
    window.location.href = '#/login';
    window.location.reload();
  }
}

export const logout = ({ commit }) => {
  commit(LOGOUT);
};

export const getProfile = ({ commit }) => {
  commit(CHANGE_LOADING_STATUS, true);
  let params = {
    token: window.localStorage.getItem('_token')
  }
  service.post('admin/profile', params).then(({ data }) => {
      const { profile } = data;
      commit(GET_PROFILE, profile);
      commit(CHANGE_LOADING_STATUS, false);
    })
    .catch(err => {
      console.log('>>> error when load logs >>> ', err);
      commit(CHANGE_LOADING_STATUS, false);
    });
};

export const updateProfile = ({ commit }, params) => {
  commit(CHANGE_LOADING_STATUS, true);
  let validate = params.status;
  if (!validate) {
    toastr.error(params.msg);
    return;
  } else {
    service.post('admin/updateProfile', params).then(({ data }) => {
        if (data.isSave == 'T') {
          toastr.success('Thay đổi thông tin thành công');
        }
        commit(CHANGE_LOADING_STATUS, false);
      })
      .catch(err => {
        toastr.error('Có lỗi xảy ra trong quá trình cập nhật!');
        console.log(err);
        commit(CHANGE_LOADING_STATUS, false);
      });
  }
};

export const updatePassword = ({ commit }, params) => {
  commit(CHANGE_LOADING_STATUS, true);
  let validate = params.status;
  if (!validate) {
    toastr.error(params.msg);
    return;
  } else {
    service.post('admin/updatePassword', params).then(({ data }) => {
        if (data.isSave == 'T') {
          toastr.success('Thay đổi mật khẩu thành công - Hãy đăng nhập lại');
          commit(LOGOUT);
        } else if (data.isSave == 'F') {
          toastr.error(data.msg);
        }
        commit(CHANGE_LOADING_STATUS, false);
      })
      .catch(err => {
        toastr.error(err);
        commit(CHANGE_LOADING_STATUS, false);
      });
  }
};
