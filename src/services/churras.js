import axios from './config';

export const getChurras = (churrasId) => axios.get(`/churras/${churrasId}`);

export const createChurras = (data) => axios.post(`/churras`, data);

export const updateChurras = (data) => axios.put(`/churras/${data._id}`, data);

export const deleteChurras = (churras) =>
  axios.delete(`/churras/${churras._id}`);

export const confirmChurras = (data) =>
  axios.put(`/churras/${data._id}/confirm`, data);

export const getChurrasList = (userId) => axios.get(`/churras/user/${userId}`);

export const submitParticipantFeedback = (data, churrasId) =>
  axios.put(`/churras/${churrasId}/participants/${data._id}`, data);
