import { all } from 'redux-saga/effects';
import { logUserSaga } from './logUserSaga';
import { updateUserSaga } from './updateUserSaga';
import { createChurrasSaga } from './createChurrasSaga';
import { updateChurrasSaga } from './updateChurrasSaga';
import { confirmChurrasSaga } from './confirmChurrasSaga';
import { getChurrasListSaga } from './getChurrasListSaga';
import { deleteUserSaga } from './deleteUserSaga';

export default function* root() {
  yield all([
    logUserSaga(),
    updateUserSaga(),
    createChurrasSaga(),
    updateChurrasSaga(),
    confirmChurrasSaga(),
    getChurrasListSaga(),
    deleteUserSaga(),
  ]);
}
