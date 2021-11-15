import { takeLatest, put, call } from 'redux-saga/effects';
import { confirmChurras as confirmChurrasRequest } from '../../services/churras';
import { churrasPayloadParser } from '../../utils/churrasPayloadParser';
import { Creators as sessionCreators } from '../ducks/session';

function* confirmChurras({ churras, sessionUser }) {
  try {
    const data = churrasPayloadParser(churras, sessionUser);
    const response = yield call(confirmChurrasRequest, data);

    yield put(sessionCreators.successConfirmChurras(response.data));
  } catch (err) {
    yield put(sessionCreators.errorConfirmChurras(err.data));
  }
}

export function* confirmChurrasSaga() {
  yield takeLatest('START_CONFIRM_CHURRAS', confirmChurras);
}
