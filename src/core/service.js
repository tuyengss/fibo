import axios from 'axios';
import { apiUrl } from '../config';

export default class Service {
  /**
   * Creates an instance of Service.
   *
   * @param {any} namespace  namespace of service (without trailing '/')
   *
   * @memberOf Service
   */
  constructor(namespace) {
    this.namespace = namespace;
    console.log('URL API:',apiUrl);
    this.axios = axios.create({
      baseURL: apiUrl,
      responseType: 'json',
    });
  }

  /**
   * Call a service action via REST API
   *
   * @param {any} action  name of action
   * @param {any} params  parameters to request
   * @returns  {Promise}
   *
   * @memberOf Service
   */
  rest(action, params) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(action, {
          method: 'post',
          data: params,
        })
        .then(response => {
          if (response.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            console.error('REST request error!', error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }

  get(action) {
    return this.axios.get(action);
  }

  post(action, params) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(action, {
          method: 'post',
          data: params,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            console.error('REST request error!', error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }
}
