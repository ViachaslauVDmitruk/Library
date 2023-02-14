import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { booksError, getBooks, setBooks } from '.';

export function* booksWorker() {
  try {
    const { data } = yield call(axios.get, 'https://strapi.cleverland.by/api/books/');

    yield put(setBooks(data));
  } catch {
    yield booksError();
    console.log('error');
  }
}

export function* booksWatcher(): Generator {
  yield takeLatest(getBooks, booksWorker);
}
