import { call, put, takeLatest } from 'redux-saga/effects';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError } from '../alert';

import { booksError, getBooks, setBooks } from '.';

export function* booksWorker() {
  try {
    const { data } = yield call(axios.get, API.booksUrl);

    yield put(setBooks(data));
  } catch {
    yield put(booksError());
    yield put(
      alertError({
        message: 'Что-то пошло не так. Обновите страницу через некоторое время.',
      })
    );
  }
}

export function* booksWatcher(): Generator {
  yield takeLatest(getBooks, booksWorker);
}
