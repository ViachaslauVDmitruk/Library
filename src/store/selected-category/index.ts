/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SELECTED_CATEGORY } from '../../const/selected-category';

import { SelectedCategoryState } from './types';

const initialState: SelectedCategoryState = {
  selectedCategory: '',
};

export const selectedCategorySlice = createSlice({
  name: SELECTED_CATEGORY,
  initialState,
  reducers: {
    selectCategoryAction: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategoryAction } = selectedCategorySlice.actions;

export const selectedCategorySliceReducer = selectedCategorySlice.reducer;
