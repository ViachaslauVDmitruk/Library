import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { RecoveryEmailType } from './type';
import { recoveryEmailError, recoveryEmailSuccess, sendRecoveryEmail } from '.';

export function* recoveryEmailWorker({ payload }: PayloadAction<RecoveryEmailType>) {
  try {
    yield call(axios.post, API.emailUrl, payload);
    yield put(recoveryEmailSuccess());
  } catch (e) {
    yield put(recoveryEmailError());
  }
}

export function* recoveryEmailWatcher(): Generator {
  yield takeLatest(sendRecoveryEmail.type, recoveryEmailWorker);
}
