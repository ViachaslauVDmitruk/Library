/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AVATAR } from '../../const/avatar';
import { ModalStateProps } from '../review/type';

export const initialState: ModalStateProps = {
  isLoadingModal: false,
  alertMessage: '',
  message: '',
};

export const avatarSlice = createSlice({
  name: AVATAR,
  initialState,
  reducers: {
    sendAvatarData: (state, action: PayloadAction<any>) => {
      state.isLoadingModal = true;
    },
    avatarUploadSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Фото успешно сохранено!';
    },
    avatarUploadError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!';
    },
    closeAvatarAlert: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const { sendAvatarData, avatarUploadSuccess, avatarUploadError, closeAvatarAlert } = avatarSlice.actions;

export const avatar = avatarSlice.reducer;
