import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError, alertSuccess } from '../alert';

import { avatarUploadEnd, sendAvatarData } from '.';

export function* avatarUploadWorker({ payload }: PayloadAction<any>) {
  const formData = new FormData();

  formData.append('files', payload.avatar[0]);

  try {
    const { data } = yield call(axios.post, API.upLoadUrl, formData);

    yield put(avatarUploadEnd());
    yield put(
      alertSuccess({
        message: 'Фото успешно сохранено!',
      })
    );
    yield call(axios.put, `${API.userUrl}/${payload.userId}`, { avatar: data[0].id });
  } catch (e) {
    yield put(avatarUploadEnd());
    yield put(
      alertError({
        message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
      })
    );
  }
}

export function* avatarUploadWatcher(): Generator {
  yield takeLatest(sendAvatarData.type, avatarUploadWorker);
}
