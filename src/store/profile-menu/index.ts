/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PROFILE_MENU } from '../../const/profile-menu';

import { ProfileMenuType } from './type';

export const initialState: ProfileMenuType = {
  isOpenProfileMenu: false,
};

export const profileMenuSlice = createSlice({
  name: PROFILE_MENU,
  initialState,
  reducers: {
    openProfileMenu: (state, action: PayloadAction) => {
      state.isOpenProfileMenu = true;
    },
    closeProfileMenu: (state, action: PayloadAction) => {
      state.isOpenProfileMenu = false;
    },
  },
});

export const { openProfileMenu, closeProfileMenu } = profileMenuSlice.actions;

export const profileMenu = profileMenuSlice.reducer;
