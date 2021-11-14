import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setChurrasProperty: ['prop', 'value'],
  setParticipantProperty: ['participantIndex', 'prop', 'value'],
  addParticipant: ['participant'],
  removeParticipant: ['participantIndex'],
});

const initialState = {
  step: 0,
  paticipants: [],
  hasVeganOption: false,
  drink: true,
  date: undefined,
  valueForTotal: 0,
  valueForBeverage: 0,
  valueForFood: 0,
  valueForVegan: 0,
  title: '',
  description: '',
  observations: '',
  pixKey: '',
  defineValueForParticipants: true,
  usePixKey: true,
  address: '',
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

const addParticipant = (state, { participant }) => {
  return { ...state, participants: [...state.participants, participant] };
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

export default createReducer(initialState, {
  [Types.SET_CHURRAS_PROPERTY]: setChurrasProperty,
  [Types.SET_PARTICIPANT_PROPERTY]: setParticipantProperty,
  [Types.ADD_PARTICIPANT]: addParticipant,
  [Types.REMOVE_PARTICIPANT]: removeParticipant,
});
