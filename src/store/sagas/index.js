import { all } from 'redux-saga/effects';
import { logUserSaga } from './logUserSaga';
import { updateUserSaga } from './updateUserSaga';

export default function* root() {
  yield all([logUserSaga(), updateUserSaga()]);
}
