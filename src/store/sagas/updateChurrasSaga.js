import { takeLatest, put, call } from 'redux-saga/effects';
import { updateChurras as updateChurrasRequest } from '../../services/churras';
import { churrasPayloadParser } from '../../utils/churrasPayloadParser';
import { Creators as sessionCreators } from '../ducks/session';

function* updateChurras({ churras, sessionUser }) {
  try {
    const data = churrasPayloadParser(churras, sessionUser);
    const response = yield call(updateChurrasRequest, data);

    yield put(sessionCreators.successUpdateChurras(response.data));
  } catch (err) {
    console.log(err);
    yield put(sessionCreators.errorUpdateChurras(err.data));
  }
}

export function* updateChurrasSaga() {
  yield takeLatest('START_UPDATE_CHURRAS', updateChurras);
}
