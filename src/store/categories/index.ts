/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesState, CategoryProps } from './types';

const initialState: CategoriesState = {
  isLoadingCategories: false,
  isErrorCategories: false,
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction) => {
      state.isLoadingCategories = true;
    },
    setCategories: (state, action: PayloadAction<CategoryProps[]>) => {
      state.isLoadingCategories = false;
      state.categories = action.payload;
    },
    categoriesError: (state, action: PayloadAction) => {
      state.isLoadingCategories = false;
      state.isErrorCategories = true;
    },
  },
});

export const { getCategories, setCategories, categoriesError } = categoriesSlice.actions;

export const categoriesSliceReducer = categoriesSlice.reducer;
