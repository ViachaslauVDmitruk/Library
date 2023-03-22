import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { avatarUploadError, avatarUploadSuccess, closeAvatarAlert, sendAvatarData } from '.';

export function* avatarUploadWorker({ payload }: PayloadAction<any>) {
  const formData = new FormData();

  formData.append('files', payload.avatar[0]);

  try {
    const { data } = yield call(axios.post, API.upLoadUrl, formData);

    yield put(avatarUploadSuccess());
    yield call(axios.put, `${API.userUrl}/${payload.userId}`, { avatar: data[0].id });
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
