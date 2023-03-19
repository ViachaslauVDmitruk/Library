/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BOOKING } from '../../const/booking';
import { ModalStateProps } from '../review/type';

import { BookingDataProps, BookingIdTypes } from './type';

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
    sendCancelBooking: (state, action: PayloadAction<BookingIdTypes>) => {
      state.isLoadingModal = true;
    },
    cancelBookingSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Бронирование книги успешно отменено!';
    },
    cancelBookingError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Не удалось отменить бронирование книги. Попробуйте позже!';
    },
    sendChangeBooking: (state, action: PayloadAction<BookingDataProps>) => {
      state.isLoadingModal = true;
    },
    changeBookingSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль';
    },
    changeBookingError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Изменения не были сохранены. Попробуйте позже!';
    },
  },
});

export const {
  sendBookingData,
  bookingError,
  bookingSuccess,
  closeBookingAlert,
  sendCancelBooking,
  cancelBookingSuccess,
  cancelBookingError,
  sendChangeBooking,
  changeBookingError,
  changeBookingSuccess,
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
