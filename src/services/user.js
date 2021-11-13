import axios from 'axios';

export const logUser = ({ user }) =>
  axios.post(`${process.env.REACT_APP_CHURRAS_API_URL}/users`, user);

export const updateUser = ({ user }) =>
  axios.put(`${process.env.REACT_APP_CHURRAS_API_URL}/users/${user._id}`, user);
