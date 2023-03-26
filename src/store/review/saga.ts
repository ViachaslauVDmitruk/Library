import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { alertError, alertSuccess } from '../alert';
import { getOneBook } from '../book';
import { getUserData } from '../user-data';

import { ChangeRevieProps, ReviewProps } from './type';
import {
  changeReviewError,
  changeReviewSuccess,
  reviewError,
  reviewSuccess,
  sendChangedReviewData,
  sendReviewData,
} from '.';

export function* reviewWorker({ payload }: PayloadAction<ReviewProps>) {
  try {
    yield call(axios.post, API.reviewUrl, { data: payload });
    yield put(getOneBook(payload.book));
    yield put(getUserData());

    yield put(reviewSuccess());
    yield put(
      alertSuccess({
        message: 'Спасибо, что нашли время оценить книгу!',
      })
    );
  } catch (e) {
    yield put(reviewError());
    yield put(
      alertError({
        message: 'Оценка не была отправлена. Попробуйте позже!',
      })
    );
  }
}

export function* changeReviewWorker({ payload }: PayloadAction<ChangeRevieProps>) {
  try {
    yield call(axios.put, `${API.reviewUrl}/${payload.commentId}`, {
      data: {
        book: payload.book,
        text: payload.text,
        rating: payload.rating,
        user: payload.user,
      },
    });
    yield put(getOneBook(payload.book));
    yield put(getUserData());
    yield put(changeReviewSuccess());
    yield put(
      alertSuccess({
        message: 'Спасибо, что нашли время изменить оценку!',
      })
    );
  } catch (e) {
    yield put(changeReviewError());
    yield put(
      alertError({
        message: 'Изменения не были сохранены. Попробуйте позже!',
      })
    );
  }
}

export function* reviewWatcher(): Generator {
  yield takeLatest(sendReviewData.type, reviewWorker);
  yield takeLatest(sendChangedReviewData.type, changeReviewWorker);
}
