import { takeLatest, put, call } from 'redux-saga/effects';
import { updateUser as updateUserRequest } from '../../services/user';
import { Creators as sessionCreators } from '../ducks/session';

function* updateSessionUser(user) {
  try {
    const response = yield call(updateUserRequest, user);

    yield put(sessionCreators.successUpdateSessionUser(response.data));
  } catch (err) {
    yield put(sessionCreators.errorUpdateSessionUser(err.data));
  }
}

export function* updateUserSaga() {
  yield takeLatest('START_UPDATE_SESSION_USER', updateSessionUser);
}
