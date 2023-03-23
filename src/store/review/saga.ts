import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { getOneBook } from '../book';
import { getUserData } from '../user-data';

import { ChangeRevieProps, ReviewProps } from './type';
import {
  changeReviewError,
  changeReviewSuccess,
  closeReviewAlert,
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
    yield delay(4000);
    yield put(closeReviewAlert());
  } catch (e) {
    yield put(reviewError());
    yield delay(4000);
    yield put(closeReviewAlert());
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
    yield delay(4000);
    yield put(closeReviewAlert());
  } catch (e) {
    yield put(changeReviewError());
    yield delay(4000);
    yield put(closeReviewAlert());
  }
}

export function* reviewWatcher(): Generator {
  yield takeLatest(sendReviewData.type, reviewWorker);
  yield takeLatest(sendChangedReviewData.type, changeReviewWorker);
}
