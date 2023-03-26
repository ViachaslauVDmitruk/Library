import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError } from '../alert';
import { UserType } from '../login/type';

import { getUserData, userResponseError, userResponseSuccess } from '.';

export function* userWorker() {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.get, `${API.userUrl}/me`);
    const { data } = response;

    yield put(userResponseSuccess(data));
  } catch (e) {
    yield put(userResponseError());
    yield put(
      alertError({
        message: 'Что-то пошло не так. Обновите страницу через некоторое время.',
      })
    );
  }
}

export function* userWatcher(): Generator {
  yield takeLatest(getUserData.type, userWorker);
}
