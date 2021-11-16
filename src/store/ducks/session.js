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
  startGetChurras: ['churrasId'],
  successGetChurras: ['churras'],
  errorGetChurras: ['error'],
  startDeleteChurras: ['churras'],
  successDeleteChurras: ['churrasId'],
  errorDeleteChurras: ['error'],
  startLoader: ['loader'],
  startSubmitParticipantFeedback: ['data', 'churraId'],
  successSubmitParticipantFeedback: [''],
  errorSubmitParticipantFeedback: ['error'],
});

const initialState = {
  churrasList: [],
  singleChurras: {
    step: 0,
    participants: [],
    hasVeganOption: false,
    drink: true,
    date: undefined,
    valueForTotal: 0,
    valueForDrink: 0,
    valueForFood: 0,
    valueForVegan: 0,
    title: '',
    description: '',
    observations: '',
    pixKey: '',
    defineValueForParticipants: true,
    usePixKey: true,
    address: '',
    totalFoodParticipants: 0,
    totalDrinkParticipants: 0,
    totalVeganParticipants: 0,
    totalParticipants: 0,
    user: '',
  },
  editMode: false,
  sessionUser: {},
  token: '',
  error: {
    sessionUser: null,
    churrasList: null,
    singleChurras: null,
    churrasForm: null,
    participantFeedback: null,
  },
  loading: {
    churras: 0,
    user: 0,
    participantFeedback: 0,
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

const successDeleteChurras = (state, { churrasId }) => {
  return {
    ...state,
    churrasList: [
      ...state.churrasList.filter((churras) => churras._id !== churrasId),
    ],
    loading: { ...state.loading, churras: 0 },
  };
};

const errorDeleteChurras = (state, { error }) => {
  return {
    ...state,
    error: { ...error, sessionUser: error },
    loading: { ...state.loading, churras: 0 },
  };
};

const successCreateChurras = (state, { churras }) => {
  return {
    ...state,
    loading: { ...state.loading, churras: 0 },
  };
};

const errorCreateChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      sessionUser: error,
    },
    loading: { ...state.loading, churras: 0 },
  };
};

const successUpdateChurras = (state, { churras }) => {
  return {
    ...state,
    singleChurras: churras,
    loading: { ...state.loading, churras: 0 },
  };
};

const errorUpdateChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      sessionUser: error,
    },
    loading: { ...state.loading, churras: 0 },
  };
};

const successConfirmChurras = (state, { churras }) => {
  return {
    ...state,
    churrasList: [
      ...state.churrasList.filter(({ _id }) => _id !== churras._id),
      churras,
    ],
    loading: { ...state.loading, churras: 0 },
  };
};

const errorConfirmChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      churrasForm: error,
    },
    loading: { ...state.loading, churras: 0 },
  };
};

const successGetChurras = (state, { churras }) => {
  return {
    ...state,
    singleChurras: { ...churras },
    loading: { ...state.loading, churras: 0 },
  };
};

const errorGetChurras = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      singleChurras: error,
    },
    loading: { ...state.loading, churras: 0 },
  };
};

const successSubmitParticipantFeedback = (state) => {
  return { ...state, loading: { ...state.loading, participantFeedback: 0 } };
};
const errorSubmitParticipantFeedback = (state, { error }) => {
  return {
    ...state,
    error: {
      ...error,
      participantFeedback: error,
    },
    loading: { ...state.loading, participantFeedback: 0 },
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
  [Types.SUCCESS_GET_CHURRAS]: successGetChurras,
  [Types.ERROR_GET_CHURRAS]: errorGetChurras,
  [Types.SUCCESS_SUBMIT_PARTICIPANT_FEEDBACK]: successSubmitParticipantFeedback,
  [Types.ERROR_SUBMIT_PARTICIPANT_FEEDBACK]: errorSubmitParticipantFeedback,
  [Types.SUCCESS_DELETE_CHURRAS]: successDeleteChurras,
  [Types.ERROR_DELETE_CHURRAS]: errorDeleteChurras,
  [Types.SET_TOKEN]: setToken,
  [Types.START_LOADER]: startLoader,
});
