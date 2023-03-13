/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RECOVERY_EMAIL } from '../../const/recovery-form';

import { RecoveryEmailProps, RecoveryEmailType } from './type';

export const initialState: RecoveryEmailProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  email: '',
  successMessage: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
};

export const recoveryEmailSlice = createSlice({
  name: RECOVERY_EMAIL,
  initialState,
  reducers: {
    sendRecoveryEmail: (state, action: PayloadAction<RecoveryEmailType>) => {
      state.isLoading = true;
    },
    recoveryEmailSuccess: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    recoveryEmailError: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isError = true;
    },
    resetRecoveryEmail: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.email = '';
    },
  },
});

export const { sendRecoveryEmail, recoveryEmailSuccess, recoveryEmailError, resetRecoveryEmail } =
  recoveryEmailSlice.actions;

export const recoveryEmail = recoveryEmailSlice.reducer;
