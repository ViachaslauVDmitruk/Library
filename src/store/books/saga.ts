import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { error } from '../error-request';

import { BookProps } from './types';
import { booksError, getBooks, setBooks } from '.';

export function* booksWorker() {
  try {
    const { data } = yield call(axios.get, 'https://strapi.cleverland.by/api/books');

    yield put(setBooks(data));
  } catch {
    //  yield put(error(data));
    yield booksError();
  }
}

export function* booksWatcher(): Generator {
  yield takeLatest(getBooks, booksWorker);
}
