import axios from 'axios';
import { SERVER_URL_LOCAL } from '../constants/UrlConstant';
axios.defaults.baseURL = SERVER_URL_LOCAL;
// axios.defaults.headers.common[
//   'Authorization'
// ] = `Bearer ${localStorage.access_token}`;

// axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
axios.interceptors.request.use(
  function (config) {
    // console.log()
    config.headers.Authorization = `Bearer ${localStorage.access_token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;
