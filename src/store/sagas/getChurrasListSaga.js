import { takeLatest, put, call } from 'redux-saga/effects';
import { getChurrasList as getChurrasListRequest } from '../../services/churras';
import { Creators as sessionCreators } from '../ducks/session';

function* getChurrasList({ userId }) {
  try {
    const response = yield call(getChurrasListRequest, userId);

    yield put(sessionCreators.successGetChurrasList(response.data));
  } catch (err) {
    console.log(err);
    yield put(sessionCreators.errorGetChurrasList(err.data));
  }
}

export function* getChurrasListSaga() {
  yield takeLatest('START_GET_CHURRAS_LIST', getChurrasList);
}
