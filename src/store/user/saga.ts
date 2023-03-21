import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { ChangedRegisterDataPayload } from './type';
import { changedRegisterError, changedRegisterSuccess, closeChangedRegisterAlert, sendChangedRegisterData } from '.';

export function* changedRegisterWorker({ payload }: PayloadAction<ChangedRegisterDataPayload>) {
  console.log('changed data', payload);
  try {
    yield call(axios.put, `${API.userUrl}/${payload.userId}`, {
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        password: payload.password,
        phone: payload.phone,
        email: payload.email,
      },
    });
    yield put(changedRegisterSuccess());
    yield delay(4000);
    yield put(closeChangedRegisterAlert());
  } catch (e) {
    yield put(changedRegisterError());
    yield delay(4000);
    yield put(closeChangedRegisterAlert());
  }
}

export function* changedRegisterWatcher(): Generator {
  yield takeLatest(sendChangedRegisterData.type, changedRegisterWorker);
}
