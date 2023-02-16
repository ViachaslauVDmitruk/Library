import { all } from 'redux-saga/effects';

import { oneBookWatcher } from './book/saga';
import { booksWatcher } from './books/saga';
import { categoriesWatcher } from './categories/saga';

export function* rootSaga(): Generator {
  yield all([booksWatcher(), oneBookWatcher(), categoriesWatcher()]);
}
