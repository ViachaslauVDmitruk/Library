import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { API } from '../../api/const';

import { RegistrationDataPayload } from './type';
import { registrationError, registrationSuccess, sendRagistrationData } from '.';

export function* registrationWorker({ payload }: PayloadAction<RegistrationDataPayload>) {
  try {
    yield call(axios.post, API.registrationUrl, payload);
    yield put(registrationSuccess());
  } catch (e) {
    const { response } = e as AxiosError;

    if (response?.status === 400) {
      yield put(
        registrationError({
          errorType: 'app',
          errorMessage:
            'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
        })
      );
    } else {
      yield put(
        registrationError({
          errorType: 'server',
          errorMessage: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        })
      );
    }
  }
}

export function* registrationWatcher(): Generator {
  yield takeLatest(sendRagistrationData.type, registrationWorker);
}
