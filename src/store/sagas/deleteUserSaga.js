import { takeLatest, put, call } from 'redux-saga/effects';
import { deleteUser as deleteUserRequest } from '../../services/user';
import { Creators as sessionCreators } from '../ducks/session';

function* deleteSessionUser(user) {
  try {
    const response = yield call(deleteUserRequest, user);

    yield put(sessionCreators.successDeleteSessionUser(response.data));
  } catch (err) {
    yield put(sessionCreators.errorDeleteSessionUser(err.data));
  }
}

export function* deleteUserSaga() {
  yield takeLatest('START_DELETE_SESSION_USER', deleteSessionUser);
}
