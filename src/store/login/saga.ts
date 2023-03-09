import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { API } from '../../api/const';

import { Credentials, LoginResponseType } from './type';
import { loginError, loginSuccess, sendLogin } from '.';

export function* loginFormWorcker({ payload }: PayloadAction<Credentials>) {
  try {
    const response: AxiosResponse<LoginResponseType> = yield call(axios.post, API.loginUrl, payload);
    const { jwt, user } = response.data;

    sessionStorage.setItem('user', JSON.stringify(user));
    Cookies.set('token', jwt);
    yield put(loginSuccess(user));
  } catch (e) {
    const { response } = e as AxiosError;

    if (response?.status === 400) {
      yield put(
        loginError({
          errorType: 'app',
          errorMessage: '',
        })
      );
    } else {
      yield put(
        loginError({
          errorType: 'server',
          errorMessage: 'Что-то пошло не так. Попробуйте еще раз',
        })
      );
    }
  }
}

export function* loginWatcher(): Generator {
  yield takeLatest(sendLogin.type, loginFormWorcker);
}
