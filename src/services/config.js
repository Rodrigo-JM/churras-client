import axios from 'axios';
import store from '../store';

axios.interceptors.request.use(function (config) {
  const token = store.getState().session.token;
  config.headers.Authorization = token;

  return config;
});
