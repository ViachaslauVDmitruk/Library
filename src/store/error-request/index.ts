/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from './types';

const initialState: ErrorState = {
  data: null,
  error: {
    status: null,
    name: '',
    message: '',
    details: {
      discription: '',
    },
  },
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    error: (state, action: PayloadAction<ErrorState>) => {
      state = action.payload;
    },
  },
});

export const { error } = errorSlice.actions;

export const errorSliceReducer = errorSlice.reducer;
