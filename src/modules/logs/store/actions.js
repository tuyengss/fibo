import { GET_ALL_LOGS, CHANGE_LOADING_STATUS } from './types';
import axios from 'axios';
import Service from '../../../core/service';
const service = new Service();

export const getAllLogs = ({ commit }, params) => {
  commit(CHANGE_LOADING_STATUS, true);
  service.post('logs', params).then(({ data }) => {
      const { logs } = data;
      let i = 1;
      commit(GET_ALL_LOGS, logs.map(log => {
        return {
          ...log,
          seq: i++
        }
      }));
      commit(CHANGE_LOADING_STATUS, false);
    })
    .catch(err => {
      console.log('>>> error when load logs >>> ', err);
      commit(CHANGE_LOADING_STATUS, false);
    });
};

export const getAllServiceName=({ commit },params)=>{
  return service.post('getAllServiceName')
}

export const exportExcel = ({ commit }, params) => {
  service.post('logs/exportExcel', params).then((data) => {
    window.open(data.data.logs.url);
  });
};
