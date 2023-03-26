import { call, put, takeLatest } from 'redux-saga/effects';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError } from '../alert';

import { categoriesError, getCategories, setCategories } from '.';

export function* categoriesWorker() {
  try {
    const { data } = yield call(axios.get, API.categoriesUrl);

    yield put(setCategories(data));
  } catch {
    yield put(categoriesError());
    yield put(
      alertError({
        message: 'Что-то пошло не так. Обновите страницу через некоторое время.',
      })
    );
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(getCategories, categoriesWorker);
}
