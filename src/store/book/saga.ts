import { useParams } from 'react-router-dom';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { closeOneBookAlert, getOneBook, oneBookError, setOneBook } from '.';

export const GetId = () => {
  const { id } = useParams();

  return id;
};

export function* oneBookWoker({ payload }: PayloadAction) {
  try {
    const { data } = yield call(axios.get, `${API.booksUrl}/${payload}`);

    yield put(setOneBook(data));

    yield delay(4000);
    yield put(closeOneBookAlert());
  } catch {
    yield put(oneBookError());
    yield delay(4000);
    yield put(closeOneBookAlert());
  }
}

export function* oneBookWatcher(): Generator {
  yield takeLatest(getOneBook.type, oneBookWoker);
}
