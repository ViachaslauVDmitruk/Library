import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { categoriesError, getCategories, setCategories } from '.';

export function* categoriesWorker() {
  try {
    const { data } = yield call(axios.get, 'https://strapi.cleverland.by/api/categories');

    yield put(setCategories(data));
  } catch {
    yield categoriesError();
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(getCategories, categoriesWorker);
}
