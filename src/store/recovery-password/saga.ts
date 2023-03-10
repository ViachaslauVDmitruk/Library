import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { loginSuccess } from '../login';
import { LoginResponseType } from '../login/type';

import { RecoveryPasswordType } from './type';
import { recoveryPasswordError, recoveryPasswordSuccess, sendRecoveryPassword } from '.';

export function* recoveryPasswordWorker({ payload }: PayloadAction<RecoveryPasswordType>) {
  try {
    const response: AxiosResponse<LoginResponseType> = yield call(axios.post, API.passwordUrl, payload);
    const { jwt, user } = response.data;

    sessionStorage.setItem('user', JSON.stringify(user));
    Cookies.set('token', jwt);
    yield put(loginSuccess(user));
    yield put(recoveryPasswordSuccess());
  } catch (e) {
    yield put(recoveryPasswordError());
  }
}

export function* recoveryPasswordWatcher(): Generator {
  yield takeLatest(sendRecoveryPassword.type, recoveryPasswordWorker);
}
