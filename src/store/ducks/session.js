import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setToken: ['token'],
  startLogSessionUser: ['user'],
  successLogSessionUser: ['user'],
  errorLogSessionUser: ['error'],
  startUpdateSessionUser: ['user'],
  successUpdateSessionUser: ['user'],
  errorUpdateSessionUser: ['error'],
});

const initialState = {
  churrasList: [],
  singleChurras: {},
  editMode: false,
  sessionUser: {},
  token: '',
  error: {
    sessionUser: null,
    churrasList: null,
    singleChurras: null,
  },
};

const successLogSessionUser = (state, { user }) => {
  return { ...state, sessionUser: user };
};

const errorLogSessionUser = (state, { error }) => {
  return { ...state, error: { ...error, sessionUser: error } };
};

const successUpdateSessionUser = (state, { user }) => {
  return { ...state, sessionUser: user };
};

const errorUpdateSessionUser = (state, { error }) => {
  return { ...state, error: { ...error, sessionUser: error } };
};

const setToken = (state, { token }) => {
  return { ...state, token };
};

export default createReducer(initialState, {
  [Types.SUCCESS_LOG_SESSION_USER]: successLogSessionUser,
  [Types.ERROR_LOG_SESSION_USER]: errorLogSessionUser,
  [Types.SUCCESS_UPDATE_SESSION_USER]: successUpdateSessionUser,
  [Types.ERROR_UPDATE_SESSION_USER]: errorUpdateSessionUser,
  [Types.SET_TOKEN]: setToken,
});
