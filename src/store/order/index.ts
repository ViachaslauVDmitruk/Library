/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BOOKING } from '../../const/booking';
import { ModalStateProps } from '../review/type';

import { BookingDataProps } from './type';

export const initialState: ModalStateProps = {
  isLoadingModal: false,
  alertMessage: '',
  message: '',
};

export const bookingSlice = createSlice({
  name: BOOKING,
  initialState,
  reducers: {
    sendBookingData: (state, action: PayloadAction<BookingDataProps>) => {
      state.isLoadingModal = true;
    },
    bookingSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Книга забронирована. Подробности можно посмотреть на странице Профиль';
    },
    bookingError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!';
    },
    closeBookingAlert: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const { sendBookingData, bookingError, bookingSuccess, closeBookingAlert } = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
