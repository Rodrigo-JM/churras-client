import { takeLatest, put, call } from 'redux-saga/effects';
import { createChurras as createChurrasRequest } from '../../services/churras';
import { churrasPayloadParser } from '../../utils/churrasPayloadParser';
import { Creators as sessionCreators } from '../ducks/session';

function* createChurras({ churras, sessionUser }) {
  try {
    const data = churrasPayloadParser(churras, sessionUser);
    const response = yield call(createChurrasRequest, data);

    yield put(sessionCreators.successCreateChurras(response.data));
  } catch (err) {
    yield put(sessionCreators.errorCreateChurras(err.data));
  }
}

export function* createChurrasSaga() {
  yield takeLatest('START_CREATE_CHURRAS', createChurras);
}
