/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CHANGED_REGISTER } from '../../const/changed-register';
import { ModalStateProps } from '../review/type';

import { ChangedRegisterDataPayload } from './type';

export const initialState: ModalStateProps = {
  isLoadingModal: false,
  alertMessage: '',
  message: '',
};

export const changedRegisterSlice = createSlice({
  name: CHANGED_REGISTER,
  initialState,
  reducers: {
    sendChangedRegisterData: (state, action: PayloadAction<ChangedRegisterDataPayload>) => {
      state.isLoadingModal = true;
    },
    changedRegisterSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Изменения успешно сохранены!';
    },
    changedRegisterError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Изменения не были сохранены. Попробуйте позже!';
    },
    closeChangedRegisterAlert: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const { sendChangedRegisterData, changedRegisterSuccess, changedRegisterError, closeChangedRegisterAlert } =
  changedRegisterSlice.actions;

export const changeRegisterData = changedRegisterSlice.reducer;
