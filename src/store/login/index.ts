/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOGIN_FORM } from '../../const/login';

import { Credentials, LoginError, LoginStateTypes, UserType } from './type';

export const initialState: LoginStateTypes = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  errorType: null,
  user: null,
};

export const loginFormSlice = createSlice({
  name: LOGIN_FORM,
  initialState,
  reducers: {
    sendLogin: (state, action: PayloadAction<Credentials>) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isSuccess = true;
    },
    loginError: (state, action: PayloadAction<LoginError>) => {
      state.isLoading = false;
      state.errorType = action.payload.errorType;
      state.errorMessage = action.payload.errorMessage;
    },
    loginResetState: (state) => {
      state.errorMessage = '';
      state.isSuccess = false;
      state.user = null;
      state.errorType = null;
    },
  },
});

export const { sendLogin, loginSuccess, loginError, loginResetState } = loginFormSlice.actions;

export const loginReducer = loginFormSlice.reducer;
