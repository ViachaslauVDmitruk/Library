import { useParams } from 'react-router-dom';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { getOneBook, oneBookError, setOneBook } from '.';

export const GetId = () => {
  const { id } = useParams();

  return id;
};

export function* oneBookWoker({ payload }: PayloadAction) {
  try {
    const { data } = yield call(axios.get, `${API.booksUrl}${payload}`);

    yield put(setOneBook(data));
  } catch {
    yield put(oneBookError());
  }
}

export function* oneBookWatcher(): Generator {
  yield takeLatest(getOneBook.type, oneBookWoker);
}
