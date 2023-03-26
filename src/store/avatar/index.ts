/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AVATAR } from '../../const/avatar';
import { LoaderType } from '../../types/loader';

export const initialState: LoaderType = {
  isLoadingModal: false,
};

export const avatarSlice = createSlice({
  name: AVATAR,
  initialState,
  reducers: {
    sendAvatarData: (state, action: PayloadAction<any>) => {
      state.isLoadingModal = true;
    },
    avatarUploadEnd: (state) => {
      state.isLoadingModal = false;
    },
  },
});

export const { sendAvatarData, avatarUploadEnd } = avatarSlice.actions;

export const avatar = avatarSlice.reducer;
