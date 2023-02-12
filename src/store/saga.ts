import { all } from 'redux-saga/effects';

import { booksWatcher } from './books/saga';

export function* rootSaga(): Generator {
  yield all([booksWatcher()]);
}
