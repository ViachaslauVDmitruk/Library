import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { UserType } from '../login/type';

import { closeUserResponseAlert, getUserData, userResponseError, userResponseSuccess } from '.';

export function* userWorker() {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.get, `${API.userUrl}/me`);
    const { data } = response;

    yield put(userResponseSuccess(data));
  } catch (e) {
    yield put(userResponseError());
	 yield delay(4000);
	 yield put(closeUserResponseAlert());
  }
}

export function* userWatcher(): Generator {
  yield takeLatest(getUserData.type, userWorker);
}
