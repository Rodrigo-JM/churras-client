import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setToken: ['token'],
  startLogSessionUser: ['user'],
  successLogSessionUser: ['user'],
  errorLogSessionUser: ['error'],
  startUpdateSessionUser: ['user'],
  successUpdateSessionUser: ['user'],
  errorUpdateSessionUser: ['error'],
  startDeleteSessionUser: ['user'],
  successDeleteSessionUser: [],
  errorDeleteSessionUser: ['error'],
  startCreateChurras: ['churras', 'sessionUser'],
  successCreateChurras: ['churras'],
  errorCreateChurras: ['error'],
  startUpdateChurras: ['churras', 'sessionUser'],
  successUpdateChurras: ['churras'],
  errorUpdateChurras: ['error'],
  startConfirmChurras: ['churras', 'sessionUser'],
  successConfirmChurras: ['churras'],
  errorConfirmChurras: ['error'],
  startGetChurrasList: ['userId'],
  successGetChurrasList: ['churrasList'],
  errorGetChurrasList: ['error'],
  startLoader: ['loader'],
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
  loading: {
    churras: 0,
    user: 0,
  },
};

const startLoader = (state, { loader }) => {
  return { ...state, loading: { ...state.loading, [loader]: 1 } };
};

const successLogSessionUser = (state, { user }) => {
  return { ...state, sessionUser: user };
};

const errorLogSessionUser = (state, { error }) => {
  return { ...state, error: { ...error, sessionUser: error } };
};

const successGetChurrasList = (state, { churrasList }) => {
  return { ...state, churrasList: churrasList };
};

const errorGetChurrasList = (state, { error }) => {
  return { ...state, error: { ...error, churrasList: error } };
};

const successUpdateSessionUser = (state, { user }) => {
  return {
    ...state,
    sessionUser: user,
    loading: { ...state.loading, user: 0 },
  };
};

const errorUpdateSessionUser = (state, { error }) => {
  return {
    ...state,
    error: { ...error, sessionUser: error },
    loading: { ...state.loading, user: 0 },
  };
};

const successDeleteSessionUser = (state) => {
  return {
    ...state,
    sessionUser: initialState.user,
    loading: { ...state.loading, user: 0 },
  };
};

const errorDeleteSessionUser = (state, { error }) => {
  return {
    ...state,
    error: { ...error, sessionUser: error },
    loading: { ...state.loading, user: 0 },
  };
};

const successCreateChurras = (state, { churras }) => {
  return {
    ...state,
    churrasList: [...state.churrasList, churras],
    loading: { ...state.loading, churras: 0 },
  };
};

const errorCreateChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      sessionUser: error,
      loading: { ...state.loading, churras: 0 },
    },
  };
};

const successUpdateChurras = (state, { churras }) => {
  return {
    ...state,
    churrasList: [...state.churrasList, churras],
    loading: { ...state.loading, churras: 0 },
  };
};

const errorUpdateChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      sessionUser: error,
      loading: { ...state.loading, churras: 0 },
    },
  };
};

const successConfirmChurras = (state, { churras }) => {
  return {
    ...state,
    churrasList: [...state.churrasList, churras],
    loading: { ...state.loading, churras: 0 },
  };
};

const errorConfirmChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      sessionUser: error,
      loading: { ...state.loading, churras: 0 },
    },
  };
};

const setToken = (state, { token }) => {
  return { ...state, token };
};

export default createReducer(initialState, {
  [Types.SUCCESS_LOG_SESSION_USER]: successLogSessionUser,
  [Types.ERROR_LOG_SESSION_USER]: errorLogSessionUser,
  [Types.SUCCESS_UPDATE_SESSION_USER]: successUpdateSessionUser,
  [Types.ERROR_UPDATE_SESSION_USER]: errorUpdateSessionUser,
  [Types.SUCCESS_DELETE_SESSION_USER]: successDeleteSessionUser,
  [Types.ERROR_DELETE_SESSION_USER]: errorDeleteSessionUser,
  [Types.SUCCESS_CREATE_CHURRAS]: successCreateChurras,
  [Types.ERROR_CREATE_CHURRAS]: errorCreateChurras,
  [Types.SUCCESS_UPDATE_CHURRAS]: successUpdateChurras,
  [Types.ERROR_UPDATE_CHURRAS]: errorUpdateChurras,
  [Types.SUCCESS_CONFIRM_CHURRAS]: successConfirmChurras,
  [Types.ERROR_CONFIRM_CHURRAS]: errorConfirmChurras,
  [Types.SUCCESS_GET_CHURRAS_LIST]: successGetChurrasList,
  [Types.ERROR_GET_CHURRAS_LIST]: errorGetChurrasList,
  [Types.SET_TOKEN]: setToken,
  [Types.START_LOADER]: startLoader,
});
