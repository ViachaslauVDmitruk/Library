import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { avatarUploadError, avatarUploadSuccess, closeAvatarAlert, sendAvatarData } from '.';

export function* avatarUploadWorker({ payload }: PayloadAction<any>) {
  const formData = new FormData();

  formData.append('files', payload[0]);

  try {
    // const response: AxiosResponse<LoginResponseType> = yield call
    yield call(axios.post, API.upLoadUrl, formData);
    yield put(avatarUploadSuccess());
    yield delay(4000);
    yield put(closeAvatarAlert());
  } catch (e) {
    yield put(avatarUploadError());
    yield delay(4000);
    yield put(closeAvatarAlert());
  }
}

export function* avatarUploadWatcher(): Generator {
  yield takeLatest(sendAvatarData.type, avatarUploadWorker);
}