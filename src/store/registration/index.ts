/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REGISTRATION } from '../../const/registration';

import { RegistrationDataPayload, RegistrationError, RegistrationStateTypes } from './type';

export const initialState: RegistrationStateTypes = {
  isLoading: false,
  isSuccess: false,
  errorType: null,
  errorMessage: '',
};

export const registrationFormSlice = createSlice({
  name: REGISTRATION,
  initialState,
  reducers: {
    sendRagistrationData: (state, action: PayloadAction<RegistrationDataPayload>) => {
      state.isLoading = true;
    },
    registrationSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    registrationError: (state, action: PayloadAction<RegistrationError>) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.errorType = action.payload.errorType;
    },
    resetRagistrationState: (state) => {
      state.isSuccess = false;
      state.errorType = null;
      state.errorMessage = '';
    },
  },
});

export const { sendRagistrationData, registrationError, registrationSuccess, resetRagistrationState } =
  registrationFormSlice.actions;

export const registrationReducer = registrationFormSlice.reducer;
