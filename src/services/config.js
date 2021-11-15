import axios from 'axios';
import store from '../store';

// Default config options
const axiosOptions = {
  baseURL: `${process.env.REACT_APP_CHURRAS_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
let axiosClient = axios.create(axiosOptions);

axiosClient.interceptors.request.use(function (config) {
  const token = store.getState().session.token;
  console.log(store.getState());
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axiosClient;
