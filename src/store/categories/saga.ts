import { call, put, takeLatest } from 'redux-saga/effects';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { categoriesError, getCategories, setCategories } from '.';

export function* categoriesWorker() {
  console.log('token categories', localStorage.getItem('token'));
  try {
    const { data } = yield call(axios.get, API.categoriesUrl);
    console.log('categories data success', data);
    yield put(setCategories(data));
  } catch {
    yield put(categoriesError());
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(getCategories, categoriesWorker);
}
