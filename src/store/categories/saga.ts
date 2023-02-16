import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { API } from '../../api/const';

import { categoriesError, getCategories, setCategories } from '.';

export function* categoriesWorker() {
  try {
    const { data } = yield call(axios.get, API.categoriesUrl);

    yield put(setCategories(data));
  } catch {
    yield put(categoriesError());
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(getCategories, categoriesWorker);
}
