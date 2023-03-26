/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SEACH_VALUE } from '../../const/search-value';

import { SearchValueType } from './type';

export const initialState: SearchValueType = {
  searchValue: '',
};

export const searchValueSlice = createSlice({
  name: SEACH_VALUE,
  initialState,
  reducers: {
    sendSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { sendSearchValue } = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
