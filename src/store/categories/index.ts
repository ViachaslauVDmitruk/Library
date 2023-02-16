/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesState, CategoryProps } from './types';

const initialState: CategoriesState = {
  isLoading: false,
  isError: false,
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    setCategories: (state, action: PayloadAction<CategoryProps[]>) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    categoriesError: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { getCategories, setCategories, categoriesError } = categoriesSlice.actions;

export const categoriesSliceReducer = categoriesSlice.reducer;
