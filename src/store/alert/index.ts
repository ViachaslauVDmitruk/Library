/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertMessageType, AtelrtProps } from './type';

export const initialState: AtelrtProps = {
  alertMessage: '',
  message: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertSuccess: (state, action: PayloadAction<AlertMessageType>) => {
      state.alertMessage = 'success';
      state.message = action.payload.message;
    },
    alertError: (state, action: PayloadAction<AlertMessageType>) => {
      state.alertMessage = 'error';
      state.message = action.payload.message;
    },
    closeAlertMessage: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const { alertError, alertSuccess, closeAlertMessage } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
