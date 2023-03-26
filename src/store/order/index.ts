/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BOOKING } from '../../const/booking';
import { LoaderType } from '../../types/loader';

import { BookingDataProps, BookingIdTypes } from './type';

export const initialState: LoaderType = {
  isLoadingModal: false,
};

export const bookingSlice = createSlice({
  name: BOOKING,
  initialState,
  reducers: {
    sendBookingData: (state, action: PayloadAction<BookingDataProps>) => {
      state.isLoadingModal = true;
    },
    sendCancelBooking: (state, action: PayloadAction<BookingIdTypes>) => {
      state.isLoadingModal = true;
    },
    sendChangeBooking: (state, action: PayloadAction<BookingDataProps>) => {
      state.isLoadingModal = true;
    },
    bookingRequestEnd: (state) => {
      state.isLoadingModal = false;
    },
  },
});

export const { sendBookingData, sendCancelBooking, sendChangeBooking, bookingRequestEnd } = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
