import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setChurrasProperty: ['prop', 'value'],
  setParticipantProperty: ['participantIndex', 'prop', 'value'],
  addParticipant: [],
  removeParticipant: ['participantIndex'],
  successCreateChurras: ['churras'],
  errorCreateChurras: ['error'],
  successUpdateChurras: ['churras'],
  errorUpdateChurras: ['error'],
  successConfirmChurras: [],
});

const initialState = {
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
};

const participantInitialState = {
  name: '',
  contact: '',
  status: false,
  confirmedPix: false,
  drink: false,
  vegan: false,
  partner: false,
  partnerVegan: false,
  partnerDrink: false,
  contributionValue: 0,
};

const setChurrasProperty = (state, { prop, value }) => {
  return { ...state, [prop]: value };
};

const setParticipantProperty = (state, { participantIndex, prop, value }) => {
  return {
    ...state,
    participants: [
      ...state.participants.map((participant, index) => {
        if (index === participantIndex) {
          return { ...participant, [prop]: value };
        }
        return participant;
      }),
    ],
  };
};

const addParticipant = (state) => {
  return {
    ...state,
    participants: [...state.participants, { ...participantInitialState }],
  };
};

const removeParticipant = (state, { participantIndex }) => {
  return {
    ...state,
    participants: [
      ...state.participants.filter(
        (participant, index) => index !== participantIndex,
      ),
    ],
  };
};

const updateChurrasFormAfterRequest = (state, { churras }) => {
  return {
    ...state,
    ...churras,
  };
};

const successConfirmChurras = (state, { churras }) => {
  return initialState;
};

const errorUpdateChurrasFormAfterRequest = (state, { error }) => {
  return {
    ...initialState,
    step: 0,
  };
};

export default createReducer(initialState, {
  [Types.SET_CHURRAS_PROPERTY]: setChurrasProperty,
  [Types.SET_PARTICIPANT_PROPERTY]: setParticipantProperty,
  [Types.ADD_PARTICIPANT]: addParticipant,
  [Types.REMOVE_PARTICIPANT]: removeParticipant,
  [Types.SUCCESS_CREATE_CHURRAS]: updateChurrasFormAfterRequest,
  [Types.ERROR_CREATE_CHURRAS]: errorUpdateChurrasFormAfterRequest,
  [Types.SUCCESS_UPDATE_CHURRAS]: updateChurrasFormAfterRequest,
  [Types.SUCCESS_CONFIRM_CHURRAS]: successConfirmChurras,
  [Types.ERROR_UPDATE_CHURRAS]: errorUpdateChurrasFormAfterRequest,
});
