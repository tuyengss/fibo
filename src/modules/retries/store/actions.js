import { GET_ALL_RETRIES, CHANGE_LOADING_STATUS } from './types';
import axios from 'axios';
import Service from '../../../core/service';
const service = new Service();

export const getAllRetries = ({ commit }, params) => {
  commit(CHANGE_LOADING_STATUS, true);
  service.post('retries', params).then(({ data }) => {
      const { retries } = data;
      let i = 1;
      commit(GET_ALL_RETRIES, retries.map(retrie => {
        console.log('retries', retries);
        return {
          ...retrie,
          seq: i++
        }
      }));
      commit(CHANGE_LOADING_STATUS, false);
    })
    .catch(err => {
      console.log('>>> error when load retries >>> ', err);
      commit(CHANGE_LOADING_STATUS, false);
    });
};

export const getAllServiceName=({ commit },params)=>{
  return service.post('getAllServiceName')
}

// export const exportExcel = ({ commit }, params) => {
//   service.post('logs/exportExcel', params).then((data) => {
//     window.open(data.data.logs.url);
//   });
// };

export const retryForwardSMS = ({ commit },params) => {
  //console.log(params)
  return service.post('retry-forward', params)
};

export const deleteForwardSMS = ({ commit },params) => {
  //console.log(params)
  return service.post('delete-forward', params)
};
