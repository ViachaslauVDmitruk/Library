/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SELECTED_CATEGORY } from '../../const/selected-category';

import { SelectedCategoryState } from './types';

const initialState: SelectedCategoryState = {
  selectedCategory: '',
  pathCategory: '',
};

export const selectedCategorySlice = createSlice({
  name: SELECTED_CATEGORY,
  initialState,
  reducers: {
    selectCategoryAction: (state, action: PayloadAction<SelectedCategoryState>) => {
      state.selectedCategory = action.payload.selectedCategory;
      state.pathCategory = action.payload.pathCategory;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = '';
      state.pathCategory = '';
    },
  },
});

export const { selectCategoryAction, clearSelectedCategory } = selectedCategorySlice.actions;

export const selectedCategorySliceReducer = selectedCategorySlice.reducer;
