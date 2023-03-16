import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';

import { BookingDataProps } from './type';
import { bookingError, bookingSuccess, closeBookingAlert, sendBookingData } from '.';

export function* bookingWorker({ payload }: PayloadAction<BookingDataProps>) {
  try {
    yield call(axios.post, API.bookingUrl, { data: payload });
    yield put(bookingSuccess());
    yield delay(4000);
    yield put(closeBookingAlert());
  } catch (e) {
    yield put(bookingError());
    yield delay(4000);
    yield put(closeBookingAlert());
  }
}

export function* bookingWatcher(): Generator {
  yield takeLatest(sendBookingData.type, bookingWorker);
}
