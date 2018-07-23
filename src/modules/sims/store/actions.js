import { GET_ALL_SIMS, GET_ALL_TELCOS, CHANGE_LOADING_STATUS } from './types';
import axios from 'axios';
import Service from '../../../core/service';

const service = new Service();

export const getAllSIMs = ({ commit }, params) => {
  commit(CHANGE_LOADING_STATUS, true);
  service
    .post('sims', params)
    .then(({ data }) => {
      const { sims } = data;
      let i = 1;
      console.log(sims);
      commit(
        GET_ALL_SIMS,
        sims.map(s => {
          return {
            ...s,
            status: 'Đang mở',
            seq: i++,
          };
        }),
      );
      commit(CHANGE_LOADING_STATUS, false);
    })
    .catch(err => {
      console.log('>>> error when load sims >>> ', err);
      commit(CHANGE_LOADING_STATUS, false);
    });
};

export const getPortbyId=({ commit },params)=>{
  return service.post('sims/getportbyid', params)
}

export const getForwardbyPort=({ commit },params)=>{
  return service.post('sims/getforwardbyport', params)
}

export const getForwardPort=({ commit },params)=>{
  return service.post('sims/updateforward', params)
}


export const updateStatusPort = ({ commit },params) => {
  //commit(CHANGE_LOADING_STATUS, true);
  //console.log(params)
  return service.post('sims/updatestatusport', params)
};

export const updatePort = ({ commit },params) => {
  //commit(CHANGE_LOADING_STATUS, true);
  //console.log(params)
  return service.post('sims/update', params)
};

export const updateForward = ({ commit },params) => {
  return service.post('sims/updateForward', params)
};

export const getAllTelcos = async ({ commit }) => {
  service.get('telcos').then(({ data }) => {
    const { telcos } = data;
    commit(GET_ALL_TELCOS, telcos);
  });
};
