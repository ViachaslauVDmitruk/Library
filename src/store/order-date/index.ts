/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DATE_ORDER } from '../../const/date-order';

import { DateOrderType } from './type';

export const initialState: DateOrderType = {
  dateOrder: new Date(),
};
export const dateOrderSlice = createSlice({
  name: DATE_ORDER,
  initialState,
  reducers: {
    getDateOrder: (state, action: PayloadAction<Date>) => {
      state.dateOrder = action.payload;
    },
  },
});

export const { getDateOrder } = dateOrderSlice.actions;

export const dateOrderReducer = dateOrderSlice.reducer;
