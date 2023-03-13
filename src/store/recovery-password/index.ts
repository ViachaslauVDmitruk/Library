/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RECOVERY_PASSWORD } from '../../const/recovery-form';

import { RecoveryPasswordType, RecoveyPasswordProps } from './type';

export const initialState: RecoveyPasswordProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  password: '',
  passwordConfirmation: '',
  code: '',
};

export const recoveryPasswordSlice = createSlice({
  name: RECOVERY_PASSWORD,
  initialState,
  reducers: {
    sendRecoveryPassword: (state, action: PayloadAction<RecoveryPasswordType>) => {
      state.isLoading = true;
    },
    recoveryPasswordSuccess: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    recoveryPasswordError: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isError = true;
    },
    resetRecoveryPassword: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.password = '';
      state.passwordConfirmation = '';
      state.code = '';
    },
  },
});

export const { sendRecoveryPassword, recoveryPasswordSuccess, recoveryPasswordError, resetRecoveryPassword } =
  recoveryPasswordSlice.actions;

export const recoveryPassword = recoveryPasswordSlice.reducer;
