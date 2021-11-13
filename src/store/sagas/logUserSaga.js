import { takeLatest, put, call } from 'redux-saga/effects';
import { logUser as logUserRequest } from '../../services/user';
import { Creators as sessionCreators } from '../ducks/session';

function* logSessionUser(user) {
  try {
    const response = yield call(logUserRequest, user);

    yield put(sessionCreators.successLogSessionUser(response.data));
  } catch (err) {
    yield put(sessionCreators.errorLogSessionUser(err.data));
  }
}

export function* logUserSaga() {
  yield takeLatest('START_LOG_SESSION_USER', logSessionUser);
}
