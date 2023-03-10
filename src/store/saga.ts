import { all } from 'redux-saga/effects';

import { oneBookWatcher } from './book/saga';
import { booksWatcher } from './books/saga';
import { categoriesWatcher } from './categories/saga';
import { loginWatcher } from './login/saga';
import { recoveryEmailWatcher } from './recovery-email/saga';
import { recoveryPasswordWatcher } from './recovery-password/saga';
import { registrationWatcher } from './registration/saga';

export function* rootSaga(): Generator {
  yield all([
    booksWatcher(),
    oneBookWatcher(),
    categoriesWatcher(),
    registrationWatcher(),
    loginWatcher(),
    recoveryEmailWatcher(),
    recoveryPasswordWatcher(),
  ]);
}
