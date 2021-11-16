import { takeLatest, put, call } from 'redux-saga/effects';
import { submitParticipantFeedback as submitParticipantFeedbackRequest } from '../../services/churras';
import { fixParticipantStatus } from '../../utils/churrasPayloadParser';
import { Creators as sessionCreators } from '../ducks/session';

function* submitParticipantFeedback({ data, churraId }) {
  try {
    const parsedParticipant = fixParticipantStatus(data);

    const response = yield call(
      submitParticipantFeedbackRequest,
      parsedParticipant,
      churraId,
    );

    yield put(sessionCreators.successSubmitParticipantFeedback(response.data));
    yield put(sessionCreators.successUpdateChurras(response.data));
  } catch (err) {
    console.log(err);
    yield put(sessionCreators.errorSubmitParticipantFeedback(err.data));
  }
}

export function* submitParticipantFeedbackSaga() {
  yield takeLatest(
    'START_SUBMIT_PARTICIPANT_FEEDBACK',
    submitParticipantFeedback,
  );
}
