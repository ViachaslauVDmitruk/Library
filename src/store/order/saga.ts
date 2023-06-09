import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError, alertSuccess } from '../alert';
import { getOneBook } from '../book';
import { getBooks } from '../books';
import { getUserData } from '../user-data';

import { BookingDataProps, BookingIdChangedTypes, BookingIdTypes } from './type';
import { bookingRequestEnd, sendBookingData, sendCancelBooking, sendChangeBooking } from '.';

export function* bookingWorker({ payload }: PayloadAction<BookingDataProps>) {
  try {
    yield call(axios.post, API.bookingUrl, { data: payload });
    yield put(bookingRequestEnd());
    yield put(getBooks());
    yield put(
      alertSuccess({
        message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
      })
    );
    yield put(getOneBook(payload.book));
  } catch (e) {
    yield put(bookingRequestEnd());
    yield put(
      alertError({
        message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
      })
    );
  }
}

export function* cancelBookingWorker({ payload }: PayloadAction<BookingIdTypes>) {
  try {
    yield call(axios.delete, `${API.bookingUrl}/${payload.bookingId}`);
    yield put(bookingRequestEnd());
    yield put(
      alertSuccess({
        message: 'Бронирование книги успешно отменено!',
      })
    );
    yield put(getUserData());
    yield put(getOneBook(payload.bookIdUpdate));
    yield put(getBooks());
  } catch (e) {
    yield put(bookingRequestEnd());
    yield put(
      alertError({
        message: 'Не удалось снять бронирование книги. Попробуйте позже!',
      })
    );
  }
}

export function* changedBookingWorker({ payload }: PayloadAction<BookingIdChangedTypes>) {
  try {
    yield call(axios.put, `${API.bookingUrl}/${payload.bookingId}`, {
      data: { order: payload.order, dateOrder: payload.dateOrder, book: payload.book, customer: payload.customer },
    });
    yield put(bookingRequestEnd());
    yield put(
      alertSuccess({
        message: 'Изменения успешно сохранены!',
      })
    );
    yield put(getOneBook(payload.book));
    yield put(getBooks());
  } catch (e) {
    yield put(bookingRequestEnd());
    yield put(
      alertError({
        message: 'Изменения не были сохранены. Попробуйте позже!',
      })
    );
  }
}

export function* bookingWatcher(): Generator {
  yield takeLatest(sendBookingData.type, bookingWorker);
  yield takeLatest(sendCancelBooking.type, cancelBookingWorker);
  yield takeLatest(sendChangeBooking.type, changedBookingWorker);
}
