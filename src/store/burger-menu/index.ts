/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BURGER_MENU } from '../../const/burger-menu';

import { BurgerStateTypes } from './types';

const initialState: BurgerStateTypes = {
  activeBurger: false,
};

export const burgerMenuSlice = createSlice({
  name: BURGER_MENU,
  initialState,
  reducers: {
    openBurgerMenu: (state, action: PayloadAction) => {
      state.activeBurger = true;
    },
    closeBurgerMenu: (state, action: PayloadAction) => {
      state.activeBurger = false;
    },
  },
});

export const { openBurgerMenu, closeBurgerMenu } = burgerMenuSlice.actions;

export const burgerMenuSliceReducer = burgerMenuSlice.reducer;
