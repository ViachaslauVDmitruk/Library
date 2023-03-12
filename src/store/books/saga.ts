import { call, put, takeLatest } from 'redux-saga/effects';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { booksError, getBooks, setBooks } from '.';

export function* booksWorker() {
  console.log('token books', localStorage.getItem('token'));
  try {
    const { data } = yield call(axios.get, API.booksUrl);
    console.log('books data success', data);
    yield put(setBooks(data));
  } catch {
    yield put(booksError());
    console.log('books error');
  }
}

export function* booksWatcher(): Generator {
  yield takeLatest(getBooks, booksWorker);
}
