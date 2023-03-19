import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { getOneBook } from '../book';

import { BookingDataProps, BookingIdTypes } from './type';
import {
  bookingError,
  bookingSuccess,
  cancelBookingError,
  cancelBookingSuccess,
  closeBookingAlert,
  sendBookingData,
  sendCancelBooking,
} from '.';
import { getBooks } from '../books';

export function* bookingWorker({ payload }: PayloadAction<BookingDataProps>) {
  try {
    yield call(axios.post, API.bookingUrl, { data: payload });
    yield put(bookingSuccess());
	 yield put(getBooks());
    yield delay(4000);
    yield put(closeBookingAlert());
    yield put(getOneBook(payload.book));
    
  } catch (e) {
    yield put(bookingError());
    yield delay(4000);
    yield put(closeBookingAlert());
  }
}

export function* cancelBookingWorker({ payload }: PayloadAction<BookingIdTypes>) {
  try {
    yield call(axios.delete, `${API.bookingUrl}/${payload.bookingId}`);
    yield put(cancelBookingSuccess());
	 yield put(getBooks());
    yield delay(4000);
    yield put(closeBookingAlert());
    yield put(getOneBook(payload.bookIdUpdate));
   
  } catch (e) {
    yield put(cancelBookingError());
    yield delay(4000);
    yield put(closeBookingAlert());
  }
}

export function* bookingWatcher(): Generator {
  yield takeLatest(sendBookingData.type, bookingWorker);
  yield takeLatest(sendCancelBooking.type, cancelBookingWorker);
}
