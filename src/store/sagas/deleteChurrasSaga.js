import { takeLatest, put, call } from 'redux-saga/effects';
import { deleteChurras as deleteChurrasRequest } from '../../services/churras';
import { Creators as sessionCreators } from '../ducks/session';

function* deleteChurras({ churras }) {
  try {
    const response = yield call(deleteChurrasRequest, churras);

    yield put(sessionCreators.successDeleteChurras(response.data));
  } catch (err) {
    yield put(sessionCreators.errorDeleteChurras(err.data));
  }
}

export function* deleteChurrasSaga() {
  yield takeLatest('START_DELETE_CHURRAS', deleteChurras);
}
