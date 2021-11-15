import axios from './config';

export const createChurras = (data) => axios.post(`/churras`, data);

export const updateChurras = (data) => axios.put(`/churras/${data._id}`, data);

export const confirmChurras = (data) =>
  axios.put(`/churras/${data._id}/confirm`, data);

export const getChurrasList = (userId) => axios.get(`/churras/user/${userId}`);
