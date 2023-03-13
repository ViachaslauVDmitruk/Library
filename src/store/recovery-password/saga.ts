import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { API } from '../../api/const';
import { loginSuccess } from '../login';
import { LoginResponseType } from '../login/type';

import { RecoveryPasswordType } from './type';
import { recoveryPasswordError, recoveryPasswordSuccess, sendRecoveryPassword } from '.';

export function* recoveryPasswordWorker({ payload }: PayloadAction<RecoveryPasswordType>) {
  try {
    const response: AxiosResponse<LoginResponseType> = yield call(axios.post, API.passwordUrl, payload);
    const { jwt, user } = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', jwt);
    yield put(loginSuccess(user));
    yield put(recoveryPasswordSuccess());
  } catch (e) {
    yield put(recoveryPasswordError());
  }
}

export function* recoveryPasswordWatcher(): Generator {
  yield takeLatest(sendRecoveryPassword.type, recoveryPasswordWorker);
}
