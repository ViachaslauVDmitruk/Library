/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER } from '../../const/user';
import { UserType } from '../login/type';

import { UserStateProps } from './type';

export const initialState: UserStateProps = {
  isLoadingUser: false,
  isErrorUserResponse: false,
  user: {} as UserType,
};

export const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    getUserData: (state) => {
      state.isLoadingUser = true;
    },
    userResponseSuccess: (state, action: PayloadAction<UserType>) => {
      state.isLoadingUser = false;
      state.user = action.payload;
    },
    userResponseError: (state) => {
      state.isLoadingUser = false;
    },
  },
});

export const { getUserData, userResponseSuccess, userResponseError } = userSlice.actions;

export const userReduser = userSlice.reducer;
