import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { API } from '../../api/const';

import { booksError, getBooks, setBooks } from '.';

export function* booksWorker() {
  try {
    const { data } = yield call(axios.get, API.booksUrl);

    yield put(setBooks(data));
  } catch {
    yield put(booksError());
  }
}

export function* booksWatcher(): Generator {
  yield takeLatest(getBooks, booksWorker);
}
