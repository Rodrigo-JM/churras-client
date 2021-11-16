import { takeLatest, put, call } from 'redux-saga/effects';
import { getChurras as getChurrasRequest } from '../../services/churras';
import { Creators as sessionCreators } from '../ducks/session';
import { Creators as churrasCreators } from '../ducks/churrasForm';
function* getChurras({ churrasId }) {
  try {
    const response = yield call(getChurrasRequest, churrasId);

    yield put(sessionCreators.successGetChurras(response.data));
    yield put(churrasCreators.populateChurrasForm(response.data));
  } catch (err) {
    console.log(err);
    yield put(sessionCreators.errorGetChurras(err.data));
  }
}

export function* getChurrasSaga() {
  yield takeLatest('START_GET_CHURRAS', getChurras);
}
