import axios from './config';

export const logUser = ({ user }) => axios.post(`/users`, user);

export const updateUser = ({ user }) => axios.put(`/users/${user._id}`, user);

export const deleteUser = ({ user }) => axios.delete(`/users/${user._id}`);
