/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INPUT_SEARCH } from '../../const/input-search';

import { InputSearchState } from './types';

const initialState: InputSearchState = {
  searchValue: '',
};

export const inputSearchSlice = createSlice({
  name: INPUT_SEARCH,
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      console.log('search', state.searchValue);
    },
  },
});

export const { setSearchValue } = inputSearchSlice.actions;

export const inputSearchSliceReducer = inputSearchSlice.reducer;
